// Importaciones de componentes de React Email - librería especializada en emails
import {
  Body, // Cuerpo principal del email
  Container, // Contenedor principal con ancho máximo
  Head, // Cabecera HTML para metadatos y estilos
  Html, // Elemento raíz HTML del email
  Img, // Componente de imagen optimizado para emails
  Link, // Enlaces seguros para clientes de email
  Preview, // Texto de preview que aparece en la bandeja de entrada
  Section, // Secciones para organizar el contenido
  Text, // Componente de texto optimizado para emails
} from "@react-email/components";
import * as React from "react";

/**
 * Interfaz que define las propiedades de la plantilla base de email
 * Esta plantilla sirve como wrapper reutilizable para todas las plantillas específicas
 */
interface BaseEmailTemplateProps {
  /** Contenido JSX que se renderizará dentro de la plantilla */
  children: React.ReactNode;
  /** Texto que aparece en la preview del email en la bandeja de entrada */
  preview: string;
  /** URL opcional del logo de la empresa - por defecto usa el logo del sitio */
  logoUrl?: string;
  /** Título que aparece en el banner del email */
  title?: string;
  /** Emoji/icono que identifica visualmente el tipo de formulario */
  icon?: string;
}

/**
 * Componente BaseEmailTemplate - Plantilla base reutilizable para todos los emails
 *
 * Esta plantilla proporciona:
 * - Estructura HTML optimizada para clientes de email
 * - Estilos CSS inline para máxima compatibilidad
 * - Header con logo, título e icono personalizable
 * - Footer con información de contacto
 * - Diseño responsivo que funciona en Gmail web y móvil
 *
 * @param children - Contenido específico de cada tipo de email
 * @param preview - Texto de vista previa en la bandeja de entrada
 * @param logoUrl - URL del logo de la empresa
 * @param title - Título del email que aparece en el header
 * @param icon - Emoji/icono identificativo del tipo de formulario
 */
export const BaseEmailTemplate: React.FC<BaseEmailTemplateProps> = ({
  children,
  preview,
  logoUrl = "https://luisfernandorealtor.com/logo.png", // Logo por defecto
  title = "Luis Fernando - Asesor Inmobiliario", // Título por defecto
  icon,
}) => {
  return (
    <Html>
      <Head>
        <style>{`
          /* 
           * ESTILOS OPTIMIZADOS PARA GMAIL Y CLIENTES DE EMAIL
           * Estos estilos garantizan que el email se vea correctamente en:
           * - Gmail web (Chrome, Firefox, Safari)
           * - Gmail móvil (Android, iOS)
           * - Otros clientes (Outlook, Apple Mail, etc.)
           */
          
          /* Media queries para dispositivos móviles - funcionan en Gmail */
          @media screen and (max-width: 600px) {
            /* Reduce el padding en móviles para aprovechar mejor el espacio */
            .mobile-padding {
              padding: 16px !important;
            }
            /* Aumenta el tamaño de fuente mínimo para legibilidad en móvil */
            .mobile-text {
              font-size: 14px !important;
            }
            /* Reduce el tamaño del título principal en pantallas pequeñas */
            .mobile-title {
              font-size: 20px !important;
            }
            /* Ajusta el tamaño del icono para móviles */
            .mobile-icon {
              font-size: 36px !important;
            }
            /* Reduce padding y margin del banner en móviles */
            .mobile-banner {
              padding: 12px !important;
              margin: 0 8px !important;
            }
            /* Fuerza elementos a apilarse verticalmente en móvil */
            .mobile-stack {
              display: block !important;
              width: 100% !important;
            }
          }
          
          /* 
           * CLASES BASE PARA COMPATIBILIDAD MÁXIMA CON GMAIL
           * Estos estilos se aplican con !important para forzar la compatibilidad
           */
          
          /* Contenedor principal del email - fuente segura y colores estables */
          .email-container {
            background-color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuentes web-safe */
            line-height: 1.6;   /* Espaciado de línea óptimo para legibilidad */
            color: #333333;     /* Color de texto con buen contraste */
          }
          
          /* 
           * HEADER SECTION - Banner principal con gradiente y efectos
           * Diseño premium que funciona en todos los clientes de email
           */
          .header-section {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); /* Gradiente dorado */
            padding: 24px;
            text-align: center;
            position: relative;
            overflow: hidden; /* Evita que los efectos se desborden */
          }
          
          /* 
           * Patrón de textura sutil en el header
           * Crea profundidad visual sin comprometer la legibilidad
           */
          .header-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), 
                        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            opacity: 0.3;
          }
          
          .content-section {
            padding: 32px 24px;
            background-color: #ffffff;
          }
          
          .footer-section {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          
          .info-card {
            background-color: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 20px;
            margin: 16px 0;
          }
          
          .highlight-text {
            color: #d97706;
            font-weight: 600;
          }
          
          .button-primary {
            background-color: #f59e0b;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            display: inline-block;
            margin: 16px 0;
          }
        `}</style>
      </Head>

      <Preview>{preview}</Preview>

      <Body
        className="email-container"
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#f8fafc",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <Section
            className="header-section"
            style={{ position: "relative", zIndex: 1 }}
          >
            {logoUrl && (
              <Img
                src={logoUrl}
                alt={title}
                width="120"
                height="40"
                style={{
                  display: "block",
                  margin: "0 auto 16px auto",
                  filter: "brightness(0) invert(1)", // Makes logo white for contrast
                }}
              />
            )}

            {/* Banner con icono destacado */}
            <div
              className="mobile-banner"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                padding: "16px",
                margin: "0 auto",
                maxWidth: "400px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              {icon && (
                <div
                  className="mobile-icon"
                  style={{
                    fontSize: "48px",
                    textAlign: "center",
                    marginBottom: "8px",
                    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                >
                  {icon}
                </div>
              )}

              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0",
                  textAlign: "center",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  letterSpacing: "0.5px",
                }}
                className="mobile-title"
              >
                {title}
              </Text>
            </div>
          </Section>

          {/* Content */}
          <Section className="content-section mobile-padding">
            {children}
          </Section>

          {/* Footer */}
          <Section className="footer-section mobile-padding">
            <Text
              style={{
                fontSize: "14px",
                color: "#64748b",
                margin: "0 0 8px 0",
                textAlign: "center",
              }}
            >
              Luis Fernando - Asesor Inmobiliario Profesional
            </Text>
            <Text
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                margin: "0 0 16px 0",
                textAlign: "center",
              }}
            >
              📧 luisfernando@realtor.com | 📱 +57 300 123 4567
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                margin: "0",
                textAlign: "center",
              }}
            >
              © 2025 Luis Fernando Realtor. Todos los derechos reservados.
            </Text>
            <Text
              style={{
                fontSize: "11px",
                color: "#cbd5e1",
                margin: "8px 0 0 0",
                textAlign: "center",
              }}
            >
              Este correo fue enviado automáticamente desde el sitio web.{" "}
              <Link
                href="#"
                style={{ color: "#f59e0b", textDecoration: "none" }}
              >
                Política de Privacidad
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BaseEmailTemplate;
