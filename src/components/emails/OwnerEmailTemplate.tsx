import { Column, Row, Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseEmailTemplate } from "./BaseEmailTemplate";

interface OwnerEmailTemplateProps {
  // Información personal
  nombre: string;
  correo: string;
  telefono: string;
  ciudad?: string;

  // Información de la propiedad
  tipoPropiedad?: string;
  direccion?: string;
  edadPropiedad?: string;
  areaConstruida?: string;
  area?: string;

  // Características
  habitaciones?: string;
  baños?: string;
  piso?: string;
  parqueaderos?: string;
  terraza?: string;
  patio?: string;

  // Amenidades (boolean)
  estudio?: boolean;
  deposito?: boolean;
  balcon?: boolean;
  piscina?: boolean;

  // Información financiera
  valorAdministracion?: string;
  valorAproximado?: string;

  // Información legal
  situacionJuridica?: string;
  detalleSituacionJuridica?: string;

  // Tipo de proyecto
  tipoProyecto?: string;

  // Comentarios
  comentariosAdicionales?: string;
}

export const OwnerEmailTemplate: React.FC<OwnerEmailTemplateProps> = ({
  nombre,
  correo,
  telefono,
  ciudad,
  tipoPropiedad,
  direccion,
  edadPropiedad,
  areaConstruida,
  area,
  habitaciones,
  baños,
  piso,
  parqueaderos,
  terraza,
  patio,
  estudio,
  deposito,
  balcon,
  piscina,
  valorAdministracion,
  valorAproximado,
  situacionJuridica,
  detalleSituacionJuridica,
  tipoProyecto,
  comentariosAdicionales,
}) => {
  const formatPropertyType = (type: string | undefined) => {
    if (!type) return "N/A";
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(parseInt(amount));
  };

  const formatAge = (age: string | undefined) => {
    if (!age) return "N/A";
    return `${age} años`;
  };

  return (
    <BaseEmailTemplate
      preview="Nueva propiedad en venta - Luis Fernando Realtor"
      title="Nueva Propiedad para Vender"
      icon="🏘️"
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
        ¡Hola Luis Fernando! 🏠
      </Text>

      <Text
        style={{
          fontSize: "16px",
          color: "#4b5563",
          margin: "0 0 24px 0",
          lineHeight: "1.6",
        }}
      >
        Un <strong>propietario</strong> está interesado en vender su propiedad y
        solicita tus servicios. Aquí están todos los detalles de la propiedad:
      </Text>

      {/* Información del Propietario */}
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
          👤 Información del Propietario
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

      {/* Información Básica de la Propiedad */}
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
          🏠 Información Básica de la Propiedad
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

        {direccion && (
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
                Dirección:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                📍 {direccion}
              </Text>
            </Column>
          </Row>
        )}

        {edadPropiedad && (
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
                Edad:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {formatAge(edadPropiedad)}
              </Text>
            </Column>
          </Row>
        )}

        {areaConstruida && (
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
                Área Construida:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {areaConstruida} m²
              </Text>
            </Column>
          </Row>
        )}

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
                Área Total:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {area} m²
              </Text>
            </Column>
          </Row>
        )}
      </div>

      {/* Características de la Propiedad */}
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
            margin: "0 0 16px 0",
            borderBottom: "2px solid #93c5fd",
            paddingBottom: "8px",
          }}
        >
          🔧 Características de la Propiedad
        </Text>

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
                🛏️ {habitaciones}
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
                🚿 {baños}
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
                🚗 {parqueaderos}
              </Text>
            </Column>
          </Row>
        )}

        {terraza && (
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
                Terraza:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                🌿 {terraza} mt²
              </Text>
            </Column>
          </Row>
        )}

        {patio && (
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
                Patio:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                🌳 {patio} mt²
              </Text>
            </Column>
          </Row>
        )}

        {/* Amenidades */}
        <Text
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            margin: "16px 0 8px 0",
          }}
        >
          Amenidades:
        </Text>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {estudio && (
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              📚 Estudio
            </span>
          )}
          {deposito && (
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              📦 Depósito
            </span>
          )}
          {balcon && (
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              🌅 Balcón
            </span>
          )}
          {piscina && (
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              🏊‍♂️ Piscina
            </span>
          )}
        </div>
      </div>

      {/* Información Financiera */}
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
          💰 Información Financiera
        </Text>

        {valorAproximado && (
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
                Valor Aproximado:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#166534",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {formatCurrency(valorAproximado)}
              </Text>
            </Column>
          </Row>
        )}

        {valorAdministracion && (
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
                Administración:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {formatCurrency(valorAdministracion)}
              </Text>
            </Column>
          </Row>
        )}
      </div>

      {/* Información Legal */}
      {situacionJuridica && (
        <div
          className="info-card"
          style={{
            backgroundColor: "#fef7ff",
            border: "1px solid #c084fc",
            borderRadius: "8px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#7c3aed",
              margin: "0 0 16px 0",
              borderBottom: "2px solid #c084fc",
              paddingBottom: "8px",
            }}
          >
            ⚖️ Situación Jurídica
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
                Situación:
              </Text>
            </Column>
            <Column style={{ width: "70%" }}>
              <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
                {situacionJuridica}
              </Text>
            </Column>
          </Row>

          {detalleSituacionJuridica && (
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
                  Detalle:
                </Text>
              </Column>
              <Column style={{ width: "70%" }}>
                <Text
                  style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}
                >
                  {detalleSituacionJuridica}
                </Text>
              </Column>
            </Row>
          )}
        </div>
      )}

      {/* Tipo de Proyecto */}
      {tipoProyecto && (
        <div
          className="info-card"
          style={{
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "8px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ea580c",
              margin: "0 0 16px 0",
              borderBottom: "2px solid #fed7aa",
              paddingBottom: "8px",
            }}
          >
            🏗️ Tipo de Proyecto
          </Text>

          <Text style={{ fontSize: "14px", color: "#1f2937", margin: "0" }}>
            {tipoProyecto}
          </Text>
        </div>
      )}

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
            &ldquo;{comentariosAdicionales}&rdquo;
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
          🚀 <strong>¡Excelente oportunidad!</strong> Contacta al propietario
          para programar una visita.
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

export default OwnerEmailTemplate;
