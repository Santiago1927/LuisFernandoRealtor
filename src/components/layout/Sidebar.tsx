"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Menu, Plus, LogOut } from "lucide-react";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useHeaderLogic } from "../../hooks/useHeaderLogic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Importación dinámica del PropertyForm para evitar problemas de chunk loading
const PropertyForm = dynamic(() => import("@/components/admin/PropertyForm"), {
  ssr: false,
  loading: () => null,
});

// Configuración de enlaces de navegación del sidebar
const navigationLinks = [
  { href: "/admin/propiedades", text: "Propiedades", icon: Building2 },
];

/**
 * Componente Sidebar para usuarios autenticados
 * Proporciona navegación, información del usuario y acciones administrativas
 * Se puede colapsar para ahorrar espacio en pantalla
 */
export default function Sidebar() {
  // Hooks para obtener información de autenticación y navegación
  const { isAuthenticated, user, handleLogout } = useHeaderLogic();
  const pathname = usePathname();

  // Estados locales del componente
  const [collapsed, setCollapsed] = useState(false); // Estado de colapso del sidebar
  const [showNewProperty, setShowNewProperty] = useState(false); // Control del modal de nueva propiedad
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar móvil
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar visibilidad en móvil

  // Effect para detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      const wasMobile = isMobile;
      const nowMobile = width < 1024;

      setIsMobile(nowMobile);

      // En móvil, inicializar como oculto
      if (nowMobile && !wasMobile) {
        setIsVisible(false);
      }
      // En desktop, siempre visible
      else if (!nowMobile && wasMobile) {
        setIsVisible(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Effect para cargar el estado de colapso desde localStorage al montar el componente
  useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar_collapsed");
      if (v !== null) setCollapsed(v === "1");
    } catch (e) {
      /* Ignora errores de localStorage */
    }
    // En desktop, inicializar como visible
    if (!isMobile) {
      setIsVisible(true);
    }
  }, [isMobile]);

  // Effect para guardar el estado de colapso y notificar cambios
  useEffect(() => {
    try {
      // Guarda el estado en localStorage
      localStorage.setItem("sidebar_collapsed", collapsed ? "1" : "0");
      try {
        // Dispara evento personalizado para notificar a otros componentes
        window.dispatchEvent(
          new CustomEvent("sidebar:change", {
            detail: { collapsed, isVisible, isMobile },
          })
        );
      } catch (e) {}
    } catch (e) {}
  }, [collapsed, isVisible, isMobile]);

  // Función para manejar el toggle del sidebar
  const handleToggleSidebar = () => {
    if (isMobile) {
      // En móvil, togglea la visibilidad
      setIsVisible((prev) => !prev);
    } else {
      // En desktop, togglea el colapso
      setCollapsed((prev) => !prev);
    }
  };

  // Escuchar eventos del botón móvil para mostrar sidebar
  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      const { action } = event.detail;
      if (action === "show" && isMobile) {
        setIsVisible(true);
      }
    };

    window.addEventListener(
      "sidebar:toggle",
      handleSidebarToggle as EventListener
    );
    return () =>
      window.removeEventListener(
        "sidebar:toggle",
        handleSidebarToggle as EventListener
      );
  }, [isMobile]);

  // Solo renderiza el sidebar cuando el usuario está autenticado Y está en páginas administrativas
  if (!isAuthenticated) return null;

  // Lista de rutas donde el sidebar debe aparecer (solo rutas administrativas)
  const adminRoutes = ["/admin", "/debug"];
  const shouldShowSidebar = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // No mostrar sidebar en el home, páginas públicas de propiedades u otras páginas públicas
  if (!shouldShowSidebar) return null;

  // En móvil, si no está visible, no renderizar
  if (isMobile && !isVisible) return null;

  // Clases CSS dinámicas basadas en el estado de colapso y dispositivo
  const baseClasses =
    "flex flex-col bg-amber-50 dark:bg-zinc-900 border-r border-amber-200 dark:border-zinc-800 shadow-md transition-all duration-300 ease-in-out";

  // En móvil: fixed position (overlay)
  // En desktop: altura mínima completa que se desplaza con el scroll
  const positionClasses = isMobile
    ? "fixed top-0 left-0 h-screen z-30 overflow-y-auto"
    : "min-h-screen";

  const widthClasses = collapsed ? "w-20" : "w-64";
  const paddingClasses = collapsed ? "p-3" : "p-6";

  const containerClass = `${baseClasses} ${positionClasses} ${widthClasses} ${paddingClasses}`;

  // Clase para mostrar/ocultar texto según el estado de colapso
  const linkTextClass = collapsed
    ? "opacity-0 scale-0"
    : "opacity-100 scale-100";

  return (
    <>
      {/* Overlay para cerrar sidebar en móvil */}
      {isMobile && isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsVisible(false)}
        />
      )}

      <aside className={containerClass} data-sidebar="main">
        {/* Botón para colapsar/expandir el sidebar - visible en móvil y desktop */}
        <div className="flex justify-end mb-4">
          <button
            aria-label={
              isMobile
                ? "Cerrar menú"
                : collapsed
                ? "Expandir menú"
                : "Colapsar menú"
            }
            onClick={handleToggleSidebar}
            className="p-2 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-700"
          >
            <Menu className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </button>
        </div>

        {/* Logo y branding - se adapta al estado de colapso */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          } mb-6`}
        >
          {/* Contenedor del logo sin fondo */}
          <div className="relative h-12 w-12 p-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          {/* Texto del branding - se oculta cuando está colapsado */}
          {!collapsed && (
            <div className="flex flex-col">
              <span
                className="text-2xl font-ultra-thin tracking-wide text-white font-cinzel"
                style={{
                  textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                REALHAUS
              </span>
            </div>
          )}
        </div>

        {/* Tarjeta de información del usuario */}
        <div
          className={`mb-6 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border dark:border-zinc-700 ${
            collapsed ? "items-center text-center" : ""
          }`}
        >
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "space-x-3"
            }`}
          >
            {/* Avatar del usuario con inicial */}
            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-200 font-semibold">
              {user?.email
                ? user.email.charAt(0).toUpperCase()
                : user?.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : "A"}
            </div>
            {/* Información del usuario - se oculta cuando está colapsado */}
            {!collapsed && (
              <div className="flex-1 transition-opacity duration-300 ease-in-out">
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {user?.displayName ?? "Administrador"}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {user?.email ?? ""}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              // Determina si el enlace está activo basándose en la ruta actual
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                        : "text-zinc-700 dark:text-zinc-200 hover:bg-amber-100 dark:hover:bg-zinc-800 hover:text-amber-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span
                      className={`text-sm font-medium transition-all duration-300 ease-in-out ${linkTextClass}`}
                    >
                      {link.text}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sección de botones de acción en la parte inferior */}
        <div className="mt-auto px-3 py-4 w-full">
          {collapsed ? (
            /* Layout de botones cuando el sidebar está colapsado */
            <div className="mt-3 flex flex-col items-center gap-3">
              {/* Botón 1: Nueva Propiedad (modo compacto) */}
              <div className="order-1">
                <Button
                  onClick={() => setShowNewProperty(true)}
                  variant="default"
                  className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-amber-500 text-black hover:bg-amber-600"
                  aria-label="Nueva Propiedad"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Botón 2: Toggle de tema (modo compacto) */}
              <div className="order-2">
                <div className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-transparent">
                  <ThemeToggleButton />
                </div>
              </div>

              {/* Botón 3: Cerrar sesión (modo compacto) */}
              <div className="order-3">
                <Button
                  onClick={() => handleLogout()}
                  variant="destructive"
                  className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-red-600 text-white hover:bg-red-700"
                  aria-label="Cerrar Sesión"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            /* Layout de botones cuando el sidebar está expandido */
            <div className="mt-3 flex flex-col gap-3">
              {/* Botón 1: Nueva Propiedad (modo expandido) */}
              <div className="order-1">
                <Button
                  onClick={() => setShowNewProperty(true)}
                  variant="default"
                  className="flex items-center w-full px-3 py-2 bg-amber-500 text-black hover:bg-amber-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Propiedad
                </Button>
              </div>

              {/* Botón 2: Toggle de tema con etiqueta (modo expandido) */}
              <div className="order-2 flex items-center justify-between p-2 rounded-md bg-white dark:bg-zinc-800 border dark:border-zinc-700">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Tema
                </span>
                <ThemeToggleButton />
              </div>

              {/* Botón 3: Cerrar sesión (modo expandido) */}
              <div className="order-3">
                <Button
                  onClick={() => handleLogout()}
                  variant="destructive"
                  className="flex items-center w-full px-3 py-2 bg-red-600 text-white hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal para crear nueva propiedad - se muestra condicionalmente */}
        {showNewProperty && (
          <PropertyForm
            property={null}
            onSave={() => setShowNewProperty(false)}
            onClose={() => setShowNewProperty(false)}
          />
        )}
      </aside>
    </>
  );
}
