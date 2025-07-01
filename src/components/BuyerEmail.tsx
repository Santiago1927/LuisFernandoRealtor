import { useState } from "react";
import BuyerForm from "./forms/BuyerForm";
import { useAlert } from "@/state/AlertContext";
import { buyerService } from "../../firebase/firestoreService";
import { PropertyType } from "@/types/forms.d";

const BuyerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
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

      // Save to Firestore
      await buyerService.createBuyer(buyerData);

      // Send email
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(buyerData),
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

  return <BuyerForm formSubmit={formSubmit} loading={loading} />;
};

export default BuyerEmail;
