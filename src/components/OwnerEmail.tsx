import { useState } from "react";
import OwnerForm from "./forms/OwnerForm";
import { useAlert } from "@/state/AlertContext";

const OwnerEmail: React.FC = () => {
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

  return <OwnerForm formSubmit={formSubmit} loading={loading} />;
};

export default OwnerEmail;
