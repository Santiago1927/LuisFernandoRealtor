import { WhatsAppButtonProps } from "@/types/whatsapp.d";
import WhatsAppIcon from "./assets/WhatsAppIcon";
import Link from "next/link";

/**
 * Componente WhatsAppButton - Botón flotante para contacto directo por WhatsApp
 * Crea un enlace directo a WhatsApp con número de teléfono y mensaje predefinido
 * @param phoneNumber - Número de teléfono de WhatsApp (sin espacios ni caracteres especiales)
 * @param message - Mensaje predefinido que se enviará (opcional)
 */
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  // Construcción de la URL de WhatsApp con parámetros
  const waLink = `https://wa.me/${phoneNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <Link
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 p-3 bg-green-500 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
};

export default WhatsAppButton;
