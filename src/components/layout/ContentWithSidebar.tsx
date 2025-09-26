"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Importaciones dinámicas para evitar problemas de chunk loading
const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
  loading: () => null,
});

const MobileSidebarToggle = dynamic(() => import("./MobileSidebarToggle"), {
  ssr: false,
  loading: () => null,
});

/**
 * Componente wrapper que crea un layout flexible con sidebar
 * En desktop: flexbox layout donde sidebar y contenido son hermanos
 * En móvil: sidebar overlay
 */
export default function ContentWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para detectar dispositivos móviles
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // Hook para obtener el estado de autenticación
  const { isAuthenticated } = useAuthContext();
  // Hook para obtener la ruta actual
  const pathname = usePathname();

  // Estado para controlar si el sidebar debe mostrarse
  const [shouldShowSidebar, setShouldShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    // Detectar dispositivo móvil
    const checkMobile = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      setIsMobile(width < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Determinar si mostrar sidebar
    const adminRoutes = ["/admin", "/debug"];
    const shouldShow =
      isAuthenticated &&
      adminRoutes.some((route) => pathname.startsWith(route));
    setShouldShowSidebar(shouldShow);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isAuthenticated, pathname]);

  // Si no hay sidebar (móvil, no autenticado, o página pública)
  if (isMobile || !shouldShowSidebar) {
    return (
      <div className="w-full">
        {/* En móvil o páginas públicas, sidebar overlay si existe */}
        {shouldShowSidebar && <Sidebar />}
        {/* Botón flotante para abrir sidebar en móvil */}
        <MobileSidebarToggle />
        {children}
      </div>
    );
  }

  // En desktop con sidebar: layout flex donde sidebar y contenido son hermanos
  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar como hermano del contenido - se desplaza completamente */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      {/* Contenido principal que se adapta automáticamente */}
      <div className="flex-1 transition-all duration-300 ease-in-out min-h-screen">
        {/* Botón flotante para desktop (aunque no debería mostrarse) */}
        <MobileSidebarToggle />
        {children}
      </div>
    </div>
  );
}
