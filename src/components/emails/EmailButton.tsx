/**
 * COMPONENTE DE BOTÓN OPTIMIZADO PARA EMAILS
 *
 * Este componente crea botones que funcionan perfectamente en clientes de email,
 * especialmente Gmail web y móvil. Incluye múltiples variantes de estilo
 * y tamaños responsivos con touch targets apropiados para móviles.
 */

import { Button } from "@react-email/components";
import * as React from "react";

/**
 * Propiedades del componente EmailButton
 */
interface EmailButtonProps {
  /** URL de destino del botón */
  href: string;
  /** Contenido del botón (texto, iconos, etc.) */
  children: React.ReactNode;
  /** Variante de color del botón */
  variant?: "primary" | "secondary" | "success" | "warning";
  /** Tamaño del botón - afecta padding y altura mínima */
  size?: "small" | "medium" | "large";
  /** Estilos CSS adicionales para personalización */
  style?: React.CSSProperties;
}

/**
 * Componente EmailButton optimizado para Gmail
 *
 * Características:
 * - Touch targets de mínimo 44px para móvil (accesibilidad)
 * - Colores que funcionan en modo claro y oscuro
 * - Estilos inline para máxima compatibilidad
 * - Múltiples variantes semánticas
 * - Responsive design
 */
export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  children,
  variant = "primary",
  size = "medium",
  style = {},
}) => {
  /**
   * VARIANTES DE COLOR
   * Cada variante tiene un propósito semántico específico
   */
  const variants = {
    /** Botón principal - color de marca (Amber) */
    primary: {
      backgroundColor: "#f59e0b", // Amber 500
      color: "#ffffff",
      borderColor: "#f59e0b",
    },
    /** Botón secundario - para acciones complementarias */
    secondary: {
      backgroundColor: "#0ea5e9", // Sky 500
      color: "#ffffff",
      borderColor: "#0ea5e9",
    },
    /** Botón de éxito - para confirmaciones positivas */
    success: {
      backgroundColor: "#059669", // Emerald 600
      color: "#ffffff",
      borderColor: "#059669",
    },
    /** Botón de advertencia - para acciones urgentes */
    warning: {
      backgroundColor: "#dc2626", // Red 600
      color: "#ffffff",
      borderColor: "#dc2626",
    },
  };

  const sizes = {
    small: {
      padding: "8px 16px",
      fontSize: "12px",
      minHeight: "32px",
    },
    medium: {
      padding: "12px 24px",
      fontSize: "14px",
      minHeight: "44px",
    },
    large: {
      padding: "16px 32px",
      fontSize: "16px",
      minHeight: "48px",
    },
  };

  const buttonStyle = {
    // Base styles for Gmail compatibility
    display: "inline-block",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
    textAlign: "center" as const,
    cursor: "pointer",
    border: "2px solid transparent",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: "1.2",
    // Variant styles
    ...variants[variant],
    // Size styles
    ...sizes[size],
    // Custom styles
    ...style,
  };

  return (
    <Button href={href} style={buttonStyle}>
      {children}
    </Button>
  );
};

export default EmailButton;
