'use client';

import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from 'next/link';
import { useHeaderLogic } from '../hooks/useHeaderLogic';

/**
 * Array de enlaces de navegación (actualmente solo contiene contacto)
 * Se puede expandir para incluir más enlaces de navegación
 */
const links = [
  { href: "#contacto", text: "Contacto" },
];

/**
 * Componente Header - Encabezado principal de la aplicación
 * Contiene el logo, navegación principal y funcionalidades de autenticación
 */
export default function Header() {
  // Hook personalizado que maneja toda la lógica del header
  const {
    isAuthenticated,    // Estado de autenticación del usuario
    menuOpen,           // Estado del menú móvil (abierto/cerrado)
    setMenuOpen,        // Función para abrir/cerrar el menú móvil
    handleLogout,       // Función para cerrar sesión
    handleAdminPanel,   // Función para acceder al panel de administrador
    router,             // Instancia del router de Next.js
  } = useHeaderLogic();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo y nombre de la empresa */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-primary-700 dark:text-primary-400 text-xl">LuisFernandoRealtor</span>
        </Link>
        
        {/* Navegación principal - visible solo en pantallas medianas y grandes */}
        <nav className="hidden md:flex gap-8">
          {/* Enlaces de navegación principales */}
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Inicio</Link>
          <Link href="/propiedades" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Propiedades</Link>
          <Link href="/contacto" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Contacto</Link>
          
          {/* Botón del panel administrador - solo visible si el usuario está autenticado */}
          {isAuthenticated && (
            <button
              onClick={handleAdminPanel}
              className="ml-4 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-secondary-900"
            >
              Panel Administrador
            </button>
          )}
        </nav>
        
        {/* Botón del menú hamburguesa - visible solo en pantallas pequeñas */}
        <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Menú móvil desplegable - visible solo cuando menuOpen es true */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <nav className="flex flex-col gap-4">
            {/* Enlaces de navegación para móvil */}
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Inicio</Link>
            <Link href="/propiedades" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Propiedades</Link>
            <Link href="/contacto" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Contacto</Link>
            
            {/* Botón del panel administrador para móvil - solo visible si el usuario está autenticado */}
            {isAuthenticated && (
              <button
                onClick={() => { setMenuOpen(false); handleAdminPanel(); }}
                className="mt-2 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600 dark:text-secondary-900"
              >
                Panel Administrador
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
