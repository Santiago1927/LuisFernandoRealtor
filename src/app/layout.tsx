import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./styles/globals.css";
import "leaflet/dist/leaflet.css";
import HeaderClient from "../components/layout/HeaderClient";
import { ThemeProvider } from "../components/theme/ThemeContext";
import { AuthProvider } from "../components/auth/AuthContext";
import Footer from "../components/layout/Footer";
import { AlertProvider } from "../components/layout/AlertContext";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import WhatsAppButton from "@/components/whatasapp/WhatsAppButton";
import ContentWithSidebar from "../components/layout/ContentWithSidebar";

// Configuración de las fuentes
const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

// Metadatos SEO de la aplicación
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title:
    "Realhaus | Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
  description:
    "Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/logo.png",
      },
    ],
  },
  openGraph: {
    title: "Realhaus | Agente de Bienes Raíces de Lujo",
    description: "Vende tu propiedad en tiempo record | Pasto, Medellín, Cali",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Realhaus Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Realhaus | Agente de Bienes Raíces de Lujo",
    description: "Vende tu propiedad en tiempo record | Pasto, Medellín, Cali",
    images: ["/logo.png"],
  },
};

/**
 * Layout raíz de la aplicación Next.js
 * Establece la estructura base y proveedores globales para toda la app
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} ${cinzel.variable} bg-gray-50 dark:bg-black text-black dark:text-white m-0 p-0`}
      >
        {/* Proveedor de React Query para manejo de estado del servidor */}
        <ReactQueryProvider>
          {/* Proveedor de tema (modo claro/oscuro) */}
          <ThemeProvider>
            {/* Proveedor de contexto de autenticación */}
            <AuthProvider>
              {/* Proveedor de alertas y notificaciones */}
              <AlertProvider>
                {/* Wrapper que ajusta el contenido según el sidebar */}
                <ContentWithSidebar>
                  {/* Header condicional que se muestra según la ruta y autenticación */}
                  <HeaderClient />

                  {/* Botón flotante de WhatsApp */}
                  <WhatsAppButton phoneNumber="573207917853" />

                  {/* Contenido de la página actual */}
                  {children}
                </ContentWithSidebar>

                {/* Footer global de la aplicación */}
                <Footer />
              </AlertProvider>
            </AuthProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
