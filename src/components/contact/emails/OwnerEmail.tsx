import { useState } from "react";
import OwnerForm from "../forms/OwnerForm";
import { useAlert } from "@/components/layout/AlertContext";
import { ownerService } from "../../../../firebase/firestoreService";

const OwnerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    console.log('=== FORM SUBMISSION START ===');
    console.log('Form data received:', data);
    
    try {
      const ownerData = {
        ...data,
        userType: "owner",
        firstQuestion: data.firstQuestion || false,
        secondQuestion: data.secondQuestion || false,
        direccion: data.direccion || "",
        edadPropiedad: data.edadPropiedad || null,
        areaConstruida: data.areaConstruida || null,
        terraza: data.terraza || null,
        patio: data.patio || null,
        habitaciones: data.habitaciones || null,
        baños: data.baños || null,
        piso: data.piso || null,
        parqueaderos: data.parqueaderos || null,
        estudio: data.estudio || false,
        deposito: data.deposito || false,
        balcon: data.balcon || false,
        vigilancia: data.vigilancia || false,
        piscina: data.piscina || false,
        valorAdministracion: data.valorAdministracion || null,
        valorAproximado: data.valorAproximado || null,
        area: data.area || null,
        situacionJuridica: data.situacionJuridica || "",
        situacionJuridicaEspecifica: data.situacionJuridicaEspecifica || "",
        tipoProyecto: data.tipoProyecto || null,
        comentariosAdicionales: data.comentariosAdicionales || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('Processed owner data:', ownerData);

      // Step 1: Try to save to Firestore
      console.log('Step 1: Saving to Firestore...');
      try {
        await ownerService.createOwner(ownerData);
        console.log('✅ Firestore save successful');
      } catch (firestoreError) {
        console.error('❌ Firestore save failed:', firestoreError);
        throw new Error(`Error al guardar en base de datos: ${firestoreError instanceof Error ? firestoreError.message : 'Error desconocido'}`);
      }

      // Step 2: Try to send email
      console.log('Step 2: Sending email...');
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          body: JSON.stringify(ownerData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log('Email API response status:', response.status);
        const responseData = await response.json();
        console.log('Email API response data:', responseData);

        if (response.ok) {
          if (responseData.error?.message?.includes('Configuración de email pendiente')) {
            console.log('✅ Data saved, email config pending');
            showAlert("¡Datos guardados correctamente! La configuración de email está pendiente.", "success");
          } else {
            console.log('✅ Email sent successfully');
            showAlert("¡Mensaje enviado exitosamente!", "success");
          }
        } else {
          console.error('❌ Email API returned error:', responseData);
          throw new Error(responseData.error?.message || `Error del servidor (${response.status})`);
        }
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Data was saved to Firestore, but email failed
        showAlert(`Datos guardados correctamente, pero falló el envío de email: ${emailError instanceof Error ? emailError.message : 'Error desconocido'}`, "error");
        return; // Don't throw, data was saved successfully
      }

    } catch (error) {
      console.error('❌ Form submission failed:', error);
      showAlert(`Error al enviar el mensaje: ${error instanceof Error ? error.message : 'Error desconocido'}`, "error");
    } finally {
      setLoading(false);
      console.log('=== FORM SUBMISSION END ===');
    }
  };

  return <OwnerForm formSubmit={formSubmit} loading={loading} />;
};

export default OwnerEmail;
