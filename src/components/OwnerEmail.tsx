import { useState } from "react";
import OwnerForm from "./forms/OwnerForm";
import { useAlert } from "@/state/AlertContext";
import { ownerService } from "../../firebase/firestoreService";
import { PropertyType } from "@/types/forms.d";

const OwnerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Preparar datos completos para Firestore
      const ownerData = {
        ...data,
        userType: "owner",
        // Asegurar que todos los campos tengan valores por defecto
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
        // Campos adicionales que pueden no estar en el formulario
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to Firestore
      await ownerService.createOwner(ownerData);

      // Send email
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(ownerData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showAlert("Mensaje Enviado !", "success");
      } else {
        showAlert("Error al enviar el mensaje", "error");
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert("Error al enviar el mensaje", "error");
    } finally {
      setLoading(false);
    }
  };

  return <OwnerForm formSubmit={formSubmit} loading={loading} />;
};

export default OwnerEmail;
