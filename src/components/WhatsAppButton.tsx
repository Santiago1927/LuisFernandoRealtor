import { WhatsAppButtonProps } from "@/types/whatsapp.d";
import WhatsAppIcon from "./assets/WhatsAppIcon";
import Link from "next/link";

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  const waLink = `https://wa.me/${phoneNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <Link
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 p-2 bg-green-500 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
};

export default WhatsAppButton;
