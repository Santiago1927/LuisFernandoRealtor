"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";

/**
 * Componente wrapper que ajusta el margen izquierdo del contenido
 * basándose en la presencia y estado del sidebar
 */
export default function ContentWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para controlar el margen izquierdo del contenido
  const [contentMarginLeft, setContentMarginLeft] = useState<number>(0);
  // Hook para obtener el estado de autenticación
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    /**
     * Función que calcula el margen izquierdo apropiado
     * basándose en el sidebar y el estado de autenticación
     */
    function compute() {
      try {
        // Obtiene el ancho de la ventana del navegador
        const width = typeof window !== "undefined" ? window.innerWidth : 0;

        // Si el usuario no está autenticado, no hay sidebar, por lo que margen = 0
        if (!isAuthenticated) {
          setContentMarginLeft(0);
          return;
        }

        // Solo aplica lógica de sidebar en pantallas de desktop (>= 1024px)
        if (width >= 1024) {
          // Verifica si el sidebar está colapsado desde localStorage
          const collapsed = localStorage.getItem("sidebar_collapsed") === "1";

          if (collapsed) {
            // Si está colapsado, el sidebar se superpone, no empuja el contenido
            setContentMarginLeft(0);
          } else {
            // Si está expandido, mide el ancho real del sidebar
            const aside = document.querySelector(
              "aside[data-sidebar='main']"
            ) as HTMLElement | null;

            if (aside) {
              const rect = aside.getBoundingClientRect();
              if (rect.width && rect.width > 0) {
                // Usa el ancho real medido
                setContentMarginLeft(Math.round(rect.width));
              } else {
                // Fallback al ancho por defecto expandido
                setContentMarginLeft(256);
              }
            } else {
              // Si no encuentra el sidebar, no aplica margen
              setContentMarginLeft(0);
            }
          }
        } else {
          // En móvil/tablet no hay sidebar fijo, por lo que margen = 0
          setContentMarginLeft(0);
        }
      } catch (e) {
        // En caso de error, no aplica margen para evitar problemas de layout
        setContentMarginLeft(0);
      }
    }

    // Ejecuta el cálculo inicial
    compute();

    // Añade listeners para eventos que pueden cambiar el layout
    window.addEventListener("resize", compute); // Cambios de tamaño de ventana

    // Listener para cambios en localStorage del estado de colapso
    const onStorage = (e: StorageEvent) => {
      if (e.key === "sidebar_collapsed") compute();
    };
    window.addEventListener("storage", onStorage);

    // Listener para eventos personalizados del sidebar
    const onSidebarChange = (e: Event) => {
      compute();
    };
    window.addEventListener("sidebar:change", onSidebarChange as EventListener);

    // Cleanup: remueve todos los listeners al desmontar
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(
        "sidebar:change",
        onSidebarChange as EventListener
      );
    };
  }, [isAuthenticated]); // Dependencia: recalcula cuando cambia el estado de autenticación

  // Effect para debug - muestra el margen actual en la consola
  useEffect(() => {
    try {
      console.debug("ContentWithSidebar margin ->", contentMarginLeft);
    } catch (e) {
      // Ignora errores de consola
    }
  }, [contentMarginLeft]);

  // Renderiza el contenido con el margen izquierdo calculado
  return <div style={{ marginLeft: contentMarginLeft }}>{children}</div>;
}
