// Importaciones específicas de React Email para estructura de contenido
import { Column, Row, Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseEmailTemplate } from "./BaseEmailTemplate";

/**
 * Interfaz que define las propiedades del email para compradores
 * Incluye tanto información personal como preferencias específicas de búsqueda
 */
interface BuyerEmailTemplateProps {
  // INFORMACIÓN PERSONAL DEL COMPRADOR
  /** Nombre completo del prospecto comprador */
  nombre: string;
  /** Dirección de email para respuesta directa */
  correo: string;
  /** Número de teléfono para contacto directo */
  telefono: string;
  /** Ciudad donde busca la propiedad (opcional) */
  ciudad?: string;

  // PREFERENCIAS Y CRITERIOS DE BÚSQUEDA
  /** Tipo de propiedad deseada (casa, apartamento, etc.) */
  tipoPropiedad?: string;
  /** Área deseada en metros cuadrados */
  area?: string;
  /** Número de habitaciones requeridas */
  habitaciones?: string;
  /** Número de baños requeridos */
  baños?: string;
  /** Número de parqueaderos necesarios */
  parqueaderos?: string;
  /** Si requiere depósito/cuarto útil */
  deposito?: boolean;
  /** Método de pago preferido (crédito, recursos propios, etc.) */
  formaDePago?: string;
  /** Presupuesto máximo disponible */
  presupuesto?: string;
  /** Comentarios adicionales o requisitos específicos */
  comentariosAdicionales?: string;
}

export const BuyerEmailTemplate: React.FC<BuyerEmailTemplateProps> = ({
  nombre,
  correo,
  telefono,
  ciudad,
  tipoPropiedad,
  area,
  habitaciones,
  baños,
  parqueaderos,
  deposito,
  formaDePago,
  presupuesto,
  comentariosAdicionales,
}) => {
  /**
   * Formatea el tipo de propiedad desde formato técnico a legible
   * Convierte "CASA_CAMPESTRE" → "Casa Campestre"
   */
  const formatPropertyType = (type: string | undefined) => {
    if (!type) return "N/A";
    return type
      .split("_") // Separa por guiones bajos
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(" "); // Une con espacios
  };

  /**
   * Formatea montos en pesos colombianos con separadores de miles
   * Convierte "250000000" → "$250.000.000 COP"
   */
  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(parseInt(amount));
  };

  return (
    <BaseEmailTemplate
      preview="Nueva consulta de comprador - Luis Fernando Realtor"
      title="Nueva Consulta de Comprador"
      icon="🏠"
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
        ¡Hola Luis Fernando! 👋
      </Text>

      <Text
        style={{
          fontSize: "16px",
          color: "#4b5563",
          margin: "0 0 24px 0",
          lineHeight: "1.6",
        }}
      >
        Has recibido una nueva consulta de un{" "}
        <strong>comprador interesado</strong> a través de tu sitio web. Aquí
        están todos los detalles:
      </Text>

      {/* Información del Cliente */}
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
          👤 Información del Cliente
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
              {telefono || "N/A"}
            </Text>
          </Column>
        </Row>

        {ciudad && (
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
                Ciudad:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {ciudad}
              </Text>
            </Column>
          </Row>
        )}
      </div>

      {/* Preferencias de Propiedad */}
      <div
        className="info-card"
        style={{
          backgroundColor: "#ecfdf5",
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
            color: "#15803d",
            margin: "0 0 16px 0",
            borderBottom: "2px solid #86efac",
            paddingBottom: "8px",
          }}
        >
          🏠 Preferencias de Propiedad
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
              Tipo:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
              {formatPropertyType(tipoPropiedad)}
            </Text>
          </Column>
        </Row>

        {area && (
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
                Área:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {area} m²
              </Text>
            </Column>
          </Row>
        )}

        {habitaciones && (
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
                Habitaciones:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {habitaciones}
              </Text>
            </Column>
          </Row>
        )}

        {baños && (
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
                Baños:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {baños}
              </Text>
            </Column>
          </Row>
        )}

        {parqueaderos && (
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
                Parqueaderos:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {parqueaderos}
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
              Depósito:
            </Text>
          </Column>
          <Column style={{ width: "70%" }}>
            <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
              {deposito ? "✅ Sí" : "❌ No"}
            </Text>
          </Column>
        </Row>

        {formaDePago && (
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
                Forma de Pago:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {formaDePago}
              </Text>
            </Column>
          </Row>
        )}

        {presupuesto && (
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
                Presupuesto:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#059669",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {formatCurrency(presupuesto)}
              </Text>
            </Column>
          </Row>
        )}
      </div>

      {/* Comentarios Adicionales */}
      {comentariosAdicionales && (
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
            💬 Comentarios Adicionales
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#374151",
              margin: "0",
              lineHeight: "1.6",
              fontStyle: "italic",
            }}
          >
            "{comentariosAdicionales}"
          </Text>
        </div>
      )}

      {/* Call to Action */}
      <Section style={{ textAlign: "center", margin: "32px 0 16px 0" }}>
        <Text
          style={{
            fontSize: "16px",
            color: "#4b5563",
            margin: "0 0 16px 0",
          }}
        >
          ⏰ <strong>Responde pronto</strong> para no perder esta oportunidad de
          negocio.
        </Text>

        <a
          href={`mailto:${correo}`}
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
      </Section>
    </BaseEmailTemplate>
  );
};

export default BuyerEmailTemplate;
