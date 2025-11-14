import { ImageResponse } from "next/og";

// Configuración del ícono
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export const runtime = "edge";

// Generador de ícono
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "system-ui, sans-serif",
            background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          R
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
