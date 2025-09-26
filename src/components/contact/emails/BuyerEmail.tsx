import { useState } from "react";
import BuyerForm from "../forms/BuyerForm";
import { useAlert } from "@/components/layout/AlertContext";
import { buyerService } from "../../../../firebase/firestoreService";

const BuyerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    console.log("=== BUYER FORM SUBMISSION START ===");
    console.log("Form data received:", data);

    try {
      // Preparar datos completos para Firestore
      const buyerData = {
        ...data,
        userType: "buyer",
        // Asegurar que todos los campos tengan valores por defecto
        area: data.area || null,
        habitaciones: data.habitaciones || null,
        baños: data.baños || null,
        parqueaderos: data.parqueaderos || null,
        deposito: data.deposito || false,
        formaDePago: data.formaDePago || null,
        presupuesto: data.presupuesto || null,
        comentariosAdicionales: data.comentariosAdicionales || "",
        // Campos adicionales que pueden no estar en el formulario
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Processed buyer data:", buyerData);

      // Step 1: Try to save to Firestore
      console.log("Step 1: Saving to Firestore...");
      try {
        await buyerService.createBuyer(buyerData);
        console.log("✅ Firestore save successful");
      } catch (firestoreError) {
        console.error("❌ Firestore save failed:", firestoreError);
        throw new Error(
          `Error al guardar en base de datos: ${
            firestoreError instanceof Error
              ? firestoreError.message
              : "Error desconocido"
          }`
        );
      }

      // Step 2: Try to send email
      console.log("Step 2: Sending email...");
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          body: JSON.stringify(buyerData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Email API response status:", response.status);
        const responseData = await response.json();
        console.log("Email API response data:", responseData);

        if (response.ok) {
          if (
            responseData.error?.message?.includes(
              "Configuración de email pendiente"
            )
          ) {
            console.log("✅ Data saved, email config pending");
            showAlert(
              "¡Datos guardados correctamente! La configuración de email está pendiente.",
              "success"
            );
          } else {
            console.log("✅ Email sent successfully");
            showAlert("¡Mensaje enviado exitosamente!", "success");
          }
        } else {
          console.error("❌ Email API returned error:", responseData);
          throw new Error(
            responseData.error?.message ||
              `Error del servidor (${response.status})`
          );
        }
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        // Data was saved to Firestore, but email failed
        showAlert(
          `Datos guardados correctamente, pero falló el envío de email: ${
            emailError instanceof Error
              ? emailError.message
              : "Error desconocido"
          }`,
          "error"
        );
        return; // Don't throw, data was saved successfully
      }
    } catch (error) {
      console.error("❌ Buyer form submission failed:", error);
      showAlert(
        `Error al enviar el mensaje: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`,
        "error"
      );
    } finally {
      setLoading(false);
      console.log("=== BUYER FORM SUBMISSION END ===");
    }
  };

  return <BuyerForm formSubmit={formSubmit} loading={loading} />;
};

export default BuyerEmail;
