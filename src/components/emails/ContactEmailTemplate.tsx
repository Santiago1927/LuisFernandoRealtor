import { Column, Row, Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseEmailTemplate } from "./BaseEmailTemplate";

interface ContactEmailTemplateProps {
  // Información personal
  nombre: string;
  correo: string;
  telefono?: string;

  // Contenido del mensaje
  asunto?: string;
  mensaje: string;

  // Información adicional del contexto
  origen?: string; // De dónde viene el mensaje (página de contacto, footer, etc.)
  fecha?: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  nombre,
  correo,
  telefono,
  asunto,
  mensaje,
  origen = "Formulario de Contacto",
  fecha,
}) => {
  const formatDate = (date?: string) => {
    if (!date) {
      return new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return new Date(date).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <BaseEmailTemplate
      preview="Nuevo mensaje de contacto - Luis Fernando Realtor"
      title="Nuevo Mensaje de Contacto"
      icon="💌"
    >
      {/* Saludo y introducción */}
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
          margin: "0 0 16px 0",
        }}
      >
        ¡Hola Luis Fernando! 💌
      </Text>

      <Text
        style={{
          fontSize: "16px",
          color: "#4b5563",
          margin: "0 0 24px 0",
          lineHeight: "1.6",
        }}
      >
        Has recibido un <strong>nuevo mensaje</strong> a través de tu sitio web.
        Un cliente potencial se ha comunicado contigo directamente.
      </Text>

      {/* Información del Remitente */}
      <div
        className="info-card"
        style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #fcd34d",
          borderRadius: "8px",
          padding: "20px",
          margin: "16px 0",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#92400e",
            margin: "0 0 16px 0",
            borderBottom: "2px solid #fcd34d",
            paddingBottom: "8px",
          }}
        >
          👤 Información del Remitente
        </Text>

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "30%" }}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                margin: "0",
              }}
            >
              Nombre:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
              {nombre || "N/A"}
            </Text>
          </Column>
        </Row>

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "30%" }}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                margin: "0",
              }}
            >
              Email:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#0ea5e9", margin: "0" }}>
              {correo || "N/A"}
            </Text>
          </Column>
        </Row>

        {telefono && (
          <Row style={{ marginBottom: "12px" }}>
            <Column style={{ width: "30%" }}>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0",
                }}
              >
                Teléfono:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {telefono}
              </Text>
            </Column>
          </Row>
        )}

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "30%" }}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                margin: "0",
              }}
            >
              Origen:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
              📍 {origen}
            </Text>
          </Column>
        </Row>

        <Row style={{ marginBottom: "12px" }}>
          <Column style={{ width: "30%" }}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                margin: "0",
              }}
            >
              Fecha:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
              🕒 {formatDate(fecha)}
            </Text>
          </Column>
        </Row>
      </div>

      {/* Asunto del Mensaje */}
      {asunto && (
        <div
          className="info-card"
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #93c5fd",
            borderRadius: "8px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#1d4ed8",
              margin: "0 0 12px 0",
              borderBottom: "2px solid #93c5fd",
              paddingBottom: "8px",
            }}
          >
            📋 Asunto
          </Text>

          <Text
            style={{
              fontSize: "15px",
              color: "#1f2937",
              margin: "0",
              fontWeight: "500",
            }}
          >
            {asunto}
          </Text>
        </div>
      )}

      {/* Mensaje Principal */}
      <div
        className="info-card"
        style={{
          backgroundColor: "#f0fdf4",
          border: "1px solid #86efac",
          borderRadius: "8px",
          padding: "20px",
          margin: "16px 0",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#166534",
            margin: "0 0 16px 0",
            borderBottom: "2px solid #86efac",
            paddingBottom: "8px",
          }}
        >
          💬 Mensaje
        </Text>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #d1fae5",
            borderRadius: "6px",
            padding: "16px",
            fontSize: "14px",
            color: "#374151",
            lineHeight: "1.7",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {mensaje.split("\n").map((paragraph, index) => (
            <Text
              key={index}
              style={{
                margin: index === 0 ? "0 0 12px 0" : "12px 0",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.7",
              }}
            >
              {paragraph.trim() || "\u00A0"}{" "}
              {/* \u00A0 es un espacio no rompible para líneas vacías */}
            </Text>
          ))}
        </div>
      </div>

      {/* Información de Urgencia */}
      <div
        style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px 0",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: "14px",
            color: "#dc2626",
            margin: "0",
            fontWeight: "600",
          }}
        >
          ⏰ <strong>Respuesta Recomendada:</strong> Dentro de las próximas 2
          horas
        </Text>
        <Text
          style={{
            fontSize: "13px",
            color: "#991b1b",
            margin: "4px 0 0 0",
          }}
        >
          Los clientes esperan respuestas rápidas para consultas directas
        </Text>
      </div>

      {/* Guía de Respuesta */}
      <div
        style={{
          backgroundColor: "#f1f5f9",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          padding: "20px",
          margin: "16px 0",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#475569",
            margin: "0 0 16px 0",
            borderBottom: "2px solid #cbd5e1",
            paddingBottom: "8px",
          }}
        >
          💡 Sugerencias para tu Respuesta
        </Text>

        <ul style={{ padding: "0 0 0 20px", margin: "0" }}>
          <li style={{ marginBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#374151", margin: "0" }}>
              <strong>Agradece</strong> el contacto y muestra interés genuino
            </Text>
          </li>
          <li style={{ marginBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#374151", margin: "0" }}>
              <strong>Responde específicamente</strong> a sus preguntas o
              inquietudes
            </Text>
          </li>
          <li style={{ marginBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#374151", margin: "0" }}>
              <strong>Ofrece una reunión</strong> o llamada para profundizar
            </Text>
          </li>
          <li style={{ marginBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#374151", margin: "0" }}>
              <strong>Incluye tu información</strong> de contacto completa
            </Text>
          </li>
          <li>
            <Text style={{ fontSize: "14px", color: "#374151", margin: "0" }}>
              <strong>Adjunta material relevante</strong> si es apropiado
            </Text>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <Section style={{ textAlign: "center", margin: "32px 0 16px 0" }}>
        <Text
          style={{
            fontSize: "16px",
            color: "#4b5563",
            margin: "0 0 16px 0",
          }}
        >
          📞 <strong>¡No dejes pasar esta oportunidad!</strong> Responde ahora
          para convertir este contacto en cliente.
        </Text>

        <a
          href={`mailto:${correo}?subject=Re: ${
            asunto || "Tu consulta inmobiliaria"
          }&body=Hola ${nombre},%0D%0A%0D%0AGracias por contactarme...`}
          className="button-primary"
          style={{
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "600",
            display: "inline-block",
            margin: "8px",
          }}
        >
          📧 Responder por Email
        </a>

        {telefono && (
          <a
            href={`tel:${telefono}`}
            className="button-primary"
            style={{
              backgroundColor: "#059669",
              color: "#ffffff",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "600",
              display: "inline-block",
              margin: "8px",
            }}
          >
            📱 Llamar Ahora
          </a>
        )}

        <a
          href={`https://wa.me/57${telefono?.replace(
            /[^0-9]/g,
            ""
          )}?text=Hola ${nombre}, recibí tu mensaje desde mi sitio web...`}
          className="button-primary"
          style={{
            backgroundColor: "#25d366",
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "600",
            display: "inline-block",
            margin: "8px",
          }}
        >
          💬 WhatsApp
        </a>
      </Section>

      {/* Recordatorio Final */}
      <div
        style={{
          backgroundColor: "#fffbeb",
          border: "1px solid #fed7aa",
          borderRadius: "8px",
          padding: "16px",
          margin: "24px 0 16px 0",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: "14px",
            color: "#92400e",
            margin: "0",
            fontWeight: "500",
          }}
        >
          🎯 <strong>Recuerda:</strong> Este contacto directo muestra alto
          interés. Una respuesta personalizada y rápida puede ser la clave para
          cerrar un nuevo negocio.
        </Text>
      </div>
    </BaseEmailTemplate>
  );
};

export default ContactEmailTemplate;
