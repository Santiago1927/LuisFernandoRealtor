import { useState } from "react";
import ContactForm from "./forms/ContactForm";
import { useAlert } from "@/state/AlertContext";
import { contactService } from "../../firebase/firestoreService";

const ContactEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Preparar datos completos para Firestore
      const contactData = {
        ...data,
        userType: "contact",
        // Campos adicionales
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to Firestore
      await contactService.createContact(contactData);

      // Send email
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(contactData),
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

  return <ContactForm formSubmit={formSubmit} loading={loading} />;
};

export default ContactEmail; 