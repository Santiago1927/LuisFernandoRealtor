"use client";

import React from "react";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import Link from "next/link";
import Image from "next/image";
import { Building2, Phone, Star } from "lucide-react";

// Configuración de los enlaces de navegación del header
const navigationLinks = [
  { href: "/propiedades", text: "Propiedades", icon: Building2 },
  { href: "/contacto", text: "Contacto", icon: Phone },
];

/**
 * Componente Header principal del sitio web
 * Incluye información de contacto, logo, navegación y toggle de tema
 * Se muestra principalmente en páginas públicas
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-zinc-900 via-black to-zinc-900 dark:from-black dark:via-zinc-900 dark:to-black border-b border-amber-500/20 shadow-2xl">
      {/* Barra superior con información de contacto y rating */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm font-medium">
            {/* Información de contacto y certificación */}
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>+57 321 422 3931</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Agente Certificado</span>
            </div>
            {/* Rating del agente */}
            <div className="flex items-center space-x-2">
              <Star className="w-3 h-3 fill-current" />
              <span>5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal del header con logo y navegación */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo y nombre de la marca - enlace al inicio */}
          <Link href="/" className="flex items-center space-x-4 group">
            {/* Contenedor del logo con efectos hover */}
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-2 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.svg"
                alt="LuisFernandoRealtor"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            {/* Texto de la marca */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white">
                LuisFernando
              </span>
              <span className="text-sm font-semibold text-amber-400 tracking-wider uppercase">
                Realtor
              </span>
            </div>
          </Link>

          {/* Navegación principal - visible solo en desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Enlaces de navegación generados dinámicamente */}
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.text}</span>
                </Link>
              );
            })}

            {/* Botón para cambiar tema (claro/oscuro) */}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
