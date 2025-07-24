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
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:shadow-3xl">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  );
};

export default WhatsAppButton;
