import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "../state/ThemeContext";
import { AuthProvider } from "../state/AuthContext";
import Footer from "../components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AlertProvider } from "@/state/AlertContext";
import ReactQueryProvider from '../ReactQueryProvider';

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
  return (
    <html lang="es">
      <ReactQueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <AlertProvider>
              <body
                className={`${inter.className} bg-gray-50 dark:bg-black text-black dark:text-white`}
              >
                <Header />
                <WhatsAppButton phoneNumber="573214223931" />
                {children}
                <Footer />
              </body>
            </AlertProvider>
          </AuthProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </html>
  );
}
