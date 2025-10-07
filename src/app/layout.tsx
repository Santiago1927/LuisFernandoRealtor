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
  title:
    "Luis Fernando Realtor | Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
  description:
    "Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
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
                  <WhatsAppButton phoneNumber="573214223931" />

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
