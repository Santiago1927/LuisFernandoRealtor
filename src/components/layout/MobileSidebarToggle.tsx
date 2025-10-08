"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../auth/AuthContext";

/**
 * Botón flotante para abrir el sidebar en dispositivos móviles
 * Solo se muestra cuando el sidebar está oculto en móvil
 */
export default function MobileSidebarToggle() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const pathname = usePathname();

  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      setIsMobile(width < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Escuchar cambios del sidebar
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      const { isVisible } = event.detail;
      setSidebarVisible(isVisible);
    };

    window.addEventListener(
      "sidebar:change",
      handleSidebarChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "sidebar:change",
        handleSidebarChange as EventListener
      );
  }, []);

  // Función para mostrar el sidebar
  const handleOpenSidebar = () => {
    window.dispatchEvent(
      new CustomEvent("sidebar:toggle", { detail: { action: "show" } })
    );
  };

  // Solo mostrar en móvil, cuando está autenticado, en rutas admin y sidebar no visible
  const adminRoutes = ["/admin", "/debug"];
  const shouldShow =
    isMobile &&
    isAuthenticated &&
    adminRoutes.some((route) => pathname.startsWith(route)) &&
    !sidebarVisible;

  if (!shouldShow) return null;

  return (
    <Button
      onClick={handleOpenSidebar}
      className="fixed top-4 left-4 z-40 h-12 w-12 p-0 rounded-full bg-custom-500 hover:bg-custom-600 text-black shadow-lg"
      aria-label="Abrir menú"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
