import { useState } from "react";
import BuyerForm from "./forms/BuyerForm";
import { useAlert } from "@/state/AlertContext";

const BuyerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(data),
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
      showAlert("Error al enviar el mensaje", "error");
    } finally {
      setLoading(false);
    }
  };

  return <BuyerForm formSubmit={formSubmit} loading={loading} />;
};

export default BuyerEmail;
