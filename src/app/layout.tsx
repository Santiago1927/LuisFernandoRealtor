import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "../state/ThemeContext";
import Footer from "../components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AlertProvider } from "@/state/AlertContext";
import Alert from "@/components/assets/Alert";

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
      <ThemeProvider>
        <AlertProvider>
          <body
            className={`${inter.className} bg-white dark:bg-black text-black dark:text-white`}
          >
            <Header />
            <div className="mt-16"></div>
            <WhatsAppButton phoneNumber="573214223931" />
            {children}
            <Footer />
          </body>
        </AlertProvider>
      </ThemeProvider>
    </html>
  );
}
