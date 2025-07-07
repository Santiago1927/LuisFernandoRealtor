import { useState } from "react";
import ContactForm from "./forms/ContactForm";
import { useAlert } from "@/state/AlertContext";
import { contactService } from "../../firebase/firestoreService";

/**
 * Componente ContactEmail - Contenedor para el formulario de contacto
 * Maneja la lógica de envío de datos a Firestore y el envío de emails
 */
const ContactEmail: React.FC = () => {
  // Estado para controlar la carga durante el envío del formulario
  const [loading, setLoading] = useState(false);
  
  // Hook para mostrar alertas al usuario
  const { showAlert } = useAlert();

  /**
   * Función que maneja el envío del formulario de contacto
   * @param data - Datos del formulario enviados por el usuario
   */
  const formSubmit = async (data: any) => {
    // Activar estado de carga
    setLoading(true);
    
    try {
      // Preparar datos completos para Firestore con metadatos adicionales
      const contactData = {
        ...data,                    // Datos originales del formulario
        userType: "contact",        // Identificador del tipo de usuario
        // Campos de auditoría
        createdAt: new Date(),      // Fecha de creación del registro
        updatedAt: new Date(),      // Fecha de última actualización
      };

      // Guardar datos en Firestore
      await contactService.createContact(contactData);

      // Enviar email a través de la API
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Manejar respuesta del envío de email
      if (response.ok) {
        showAlert("Mensaje Enviado !", "success");
      } else {
        showAlert("Error al enviar el mensaje", "error");
      }
    } catch (error) {
      // Manejar errores durante el proceso
      console.error('Error:', error);
      showAlert("Error al enviar el mensaje", "error");
    } finally {
      // Desactivar estado de carga independientemente del resultado
      setLoading(false);
    }
  };

  // Renderizar el formulario de contacto con la función de envío y estado de carga
  return <ContactForm formSubmit={formSubmit} loading={loading} />;
};

export default ContactEmail; 