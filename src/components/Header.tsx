'use client';

import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuthContext } from "../state/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: "#contacto", text: "Contacto" },
];

export default function Header() {
  const { user, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleAdminPanel = () => {
    if (isAuthenticated) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-primary-700 dark:text-primary-400 text-xl">LuisFernandoRealtor</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Inicio</Link>
          <Link href="/propiedades" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Propiedades</Link>
          <Link href="/contacto" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Contacto</Link>
        </nav>
        <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Inicio</Link>
            <Link href="/propiedades" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Propiedades</Link>
            <Link href="/contacto" className="hover:text-primary-600 dark:hover:text-primary-400 font-medium">Contacto</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
