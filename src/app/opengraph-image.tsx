import { ImageResponse } from "next/og";

// Metadatos de la imagen
export const alt = "Realhaus - Agente de Bienes Raíces de Lujo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Generador de imagen
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            REALHAUS
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#FFFFFF",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Agente de Bienes Raíces de Lujo
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#D4AF37",
            textAlign: "center",
          }}
        >
          Pasto • Medellín • Cali
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
