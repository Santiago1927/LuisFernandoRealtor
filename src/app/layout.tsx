import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "leaflet/dist/leaflet.css";
import HeaderClient from "../components/layout/HeaderClient";
import Sidebar from "../components/layout/Sidebar";
import { ThemeProvider } from "../components/theme/ThemeContext";
import { AuthProvider } from "../components/auth/AuthContext";
import Footer from "../components/layout/Footer";
import { AlertProvider } from "@/components/layout/AlertContext";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import WhatsAppButton from "@/components/whatasapp/WhatsAppButton";
import ContentWithSidebar from "../components/layout/ContentWithSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Luis Fernando Realtor | Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
  description:
    "Agente de Bienes Raíces de Lujo | Pasto, Medellín, Cali | Vende tu propiedad en tiempo record",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // contentMarginLeft is handled on client inside ContentWithSidebar
  return (
    <html lang="es">
      <ReactQueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <AlertProvider>
              <body
                className={`${inter.className} bg-gray-50 dark:bg-black text-black dark:text-white`}
              >
                <Sidebar />
                <ContentWithSidebar>
                  <HeaderClient />
                  <WhatsAppButton phoneNumber="573214223931" />
                  {children}
                </ContentWithSidebar>
                <Footer />
              </body>
            </AlertProvider>
          </AuthProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </html>
  );
}
