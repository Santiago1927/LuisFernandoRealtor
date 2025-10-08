"use client";

import React, { useState, useEffect } from "react";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Phone,
  Star,
  Instagram,
  Facebook,
  DollarSign,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Componente personalizado para el ícono de TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Configuración de los enlaces de navegación del sidebar
const sidebarLinks = [
  { href: "/", text: "Inicio", icon: Home },
  { href: "/propiedades", text: "Propiedades", icon: Building2 },
  { href: "/contacto#vender", text: "Vender", icon: DollarSign },
  { href: "/contacto", text: "Contacto", icon: Phone },
];

// Configuración de redes sociales
const socialLinks = [
  {
    href: "https://www.instagram.com/realhaus.luxury?igsh=c3NjOWF4aDJzMTY1&utm_source=qr",
    icon: Instagram,
    name: "Instagram",
    ariaLabel: "Síguenos en Instagram",
  },
  {
    href: "https://www.tiktok.com/@realhaus.luxury?_t=ZS-90CAWBa7TWu&_r=1",
    icon: TikTokIcon,
    name: "TikTok",
    ariaLabel: "Síguenos en TikTok",
  },
  {
    href: "https://www.facebook.com/share/1N6jBeX4og/?mibextid=wwXIfr",
    icon: Facebook,
    name: "Facebook",
    ariaLabel: "Síguenos en Facebook",
  },
];

/**
 * Componente MobileHeader con Sidebar
 * Incluye un header compacto para móviles y un sidebar deslizable
 */
export default function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Bloquear scroll cuando el sidebar está abierto
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Funciones para manejar gestos de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    // Si el swipe es hacia la derecha desde el borde derecho, abrir sidebar
    if (touchStart > window.innerWidth - 50 && touchDiff < -50) {
      openSidebar();
    }

    // Si el swipe es hacia la derecha dentro del sidebar, cerrarlo
    if (isSidebarOpen && touchDiff < -50) {
      setIsSidebarOpen(false);
    }

    setTouchStart(null);
  };

  // Cerrar sidebar al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  // Función para abrir el sidebar con vibración
  const openSidebar = () => {
    setIsSidebarOpen(true);
    // Vibración suave en dispositivos compatibles
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-zinc-900 via-black to-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black border-b border-custom-500/20 shadow-2xl">
        {/* Barra superior con información de contacto - solo visible en desktop */}
        <div className="hidden md:block bg-gradient-to-r from-custom-600 to-custom-600 text-black py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm font-medium">
              <div className="flex items-center space-x-6">
                <span className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>321 422 3931</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>317 777 2601</span>
                </span>
                <span>•</span>
                <span>Agente Certificado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-3 h-3 fill-current" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo y nombre de la marca */}
            <Link
              href="/"
              className="flex items-center space-x-2 md:space-x-4 group"
            >
              <div className="relative h-10 w-10 md:h-14 md:w-14 p-1 md:p-2 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  width={56}
                  height={56}
                  alt="REALHAUS"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xl md:text-2xl font-ultra-thin tracking-wide text-white font-cinzel"
                  style={{
                    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  REALHAUS
                </span>
              </div>
            </Link>

            {/* Navegación desktop - oculta en móvil */}
            <div className="hidden md:flex items-center space-x-6">
              {sidebarLinks.slice(1).map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={`desktop-nav-${index}`}
                    href={link.href}
                    className="flex items-center space-x-2 text-white hover:text-custom-400 transition-colors font-medium text-sm lg:text-base"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.text}</span>
                  </Link>
                );
              })}

              <div className="h-6 w-px bg-custom-500/30"></div>

              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={`desktop-social-${social.name}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="text-white hover:text-custom-400 transition-colors duration-200 hover:scale-110 transform"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <ThemeToggleButton />
            </div>

            {/* Botones móviles */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggleButton />
              <Button
                variant="ghost"
                size="icon"
                onClick={openSidebar}
                className="text-white hover:text-custom-400 hover:bg-custom-400/10 touch-manipulation"
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay del sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar móvil */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-zinc-900 via-black to-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-custom-500/20">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="REALHAUS"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white font-cinzel">
              REALHAUS
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:text-custom-400 hover:bg-custom-400/10"
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Información de contacto en sidebar */}
        <div className="bg-gradient-to-r from-custom-600 to-custom-600 text-black p-4 m-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-base mb-3">Contacto Directo</h3>
          <div className="space-y-2">
            <a
              href="tel:+573214223931"
              className="flex items-center space-x-2 text-sm font-medium hover:underline transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>321 422 3931</span>
            </a>
            <a
              href="tel:+573177772601"
              className="flex items-center space-x-2 text-sm font-medium hover:underline transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>317 777 2601</span>
            </a>
            <div className="flex items-center space-x-2 text-sm font-medium pt-2 border-t border-black/20">
              <Star className="w-4 h-4 fill-current" />
              <span>Agente Certificado • 5.0 ★</span>
            </div>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <nav className="px-4 py-2 flex-1 overflow-y-auto">
          {sidebarLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={`sidebar-link-${index}`}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center space-x-4 text-white hover:text-custom-400 hover:bg-custom-400/10 active:bg-custom-400/20 transition-all duration-200 p-4 rounded-lg mb-2 group touch-manipulation"
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-lg font-medium">{link.text}</span>
              </Link>
            );
          })}
        </nav>

        {/* Redes sociales en sidebar */}
        <div className="mt-auto p-4 border-t border-custom-500/20">
          <p className="text-white/80 text-sm mb-4 text-center">
            Síguenos en redes sociales
          </p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={`sidebar-social-${social.name}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-white hover:text-custom-400 transition-all duration-200 hover:scale-125 transform p-2 hover:bg-custom-400/10 rounded-lg touch-manipulation"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicador de swipe en el borde derecho - solo móvil */}
      {!isSidebarOpen && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-custom-500/50 rounded-l-lg md:hidden z-40 animate-pulse" />
      )}
    </div>
  );
}
