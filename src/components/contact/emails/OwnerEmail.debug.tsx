// DEBUGGING TEMPORAL - OwnerEmail con logs
import { useState } from "react";
import OwnerForm from "../forms/OwnerForm";
import { useAlert } from "@/components/layout/AlertContext";
import { ownerService } from "../../../../firebase/firestoreService";

const OwnerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    console.log("🚀 FORM SUBMISSION INITIATED");
    console.log("📋 Raw form data:", data);

    // Validate required fields manually for debugging
    console.log("🔍 Checking required fields:");
    console.log(
      "  - firstQuestion:",
      data.firstQuestion,
      typeof data.firstQuestion
    );
    console.log(
      "  - secondQuestion:",
      data.secondQuestion,
      typeof data.secondQuestion
    );
    console.log("  - nombre:", data.nombre);
    console.log("  - correo:", data.correo);
    console.log("  - telefono:", data.telefono);
    console.log("  - ciudad:", data.ciudad);
    console.log("  - tipoPropiedad:", data.tipoPropiedad);

    if (!data.firstQuestion) {
      console.log("❌ firstQuestion is missing or false");
      showAlert("Debes responder 'Sí' a la primera pregunta", "error");
      return;
    }

    if (!data.secondQuestion) {
      console.log("❌ secondQuestion is missing or false");
      showAlert("Debes responder 'Sí' a la segunda pregunta", "error");
      return;
    }

    if (!data.nombre) {
      console.log("❌ nombre is missing");
      showAlert("El nombre es obligatorio", "error");
      return;
    }

    if (!data.correo) {
      console.log("❌ correo is missing");
      showAlert("El correo es obligatorio", "error");
      return;
    }

    console.log("✅ All required fields present, proceeding with submission");

    setLoading(true);

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

      console.log("📦 Processed owner data:", ownerData);

      // Step 1: Try to save to Firestore
      console.log("💾 Step 1: Saving to Firestore...");
      try {
        await ownerService.createOwner(ownerData);
        console.log("✅ Firestore save successful");
      } catch (firestoreError) {
        console.error("❌ Firestore save failed:", firestoreError);
        // Continue anyway to try email
      }

      // Step 2: Try to send email
      console.log("📧 Step 2: Sending email...");
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ownerData),
      });

      console.log("📬 Email response status:", response.status);

      if (response.ok) {
        console.log("✅ Email sent successfully");
        showAlert(
          "¡Solicitud enviada exitosamente! Te contactaremos pronto.",
          "success"
        );
      } else {
        const errorText = await response.text();
        console.error("❌ Email send failed:", errorText);
        throw new Error(`Email send failed: ${response.status}`);
      }
    } catch (error) {
      console.error("💥 Complete submission failed:", error);
      showAlert(
        "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.",
        "error"
      );
    } finally {
      console.log("🏁 Form submission completed");
      setLoading(false);
    }
  };

  return <OwnerForm formSubmit={formSubmit} loading={loading} />;
};

export default OwnerEmail;
