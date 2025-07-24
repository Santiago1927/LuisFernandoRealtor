'use client';

import ThemeToggleButton from "./ThemeToggleButton";
import Link from 'next/link';
import { useHeaderLogic } from '../hooks/useHeaderLogic';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2, Home, Phone, User } from "lucide-react";


const navigationLinks = [
  { href: "/", text: "Inicio", icon: Home },
  { href: "/propiedades", text: "Propiedades", icon: Building2 },
  { href: "/contacto", text: "Contacto", icon: Phone },
];


export default function Header() {
  const {
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    handleAdminPanel,
  } = useHeaderLogic();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/50 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 p-1 shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.svg" 
                alt="LuisFernandoRealtor" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                LuisFernando
              </span>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400 tracking-wide">
                REALTOR
              </span>
            </div>
          </Link>

          {/* Navegación principal - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.text}</span>
                </Link>
              );
            })}
          </nav>

          {/* Acciones del lado derecho - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && (
              <Button
                onClick={handleAdminPanel}
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold shadow-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-200"
              >
                <User className="mr-2 h-4 w-4" />
                Panel Admin
              </Button>
            )}
            
            <div className="flex items-center space-x-2">
              <ThemeToggleButton />
            </div>
          </div>

          {/* Menú móvil */}
          <div className="lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white/95 backdrop-blur dark:bg-black/95">
                <div className="flex flex-col space-y-6 pt-6">
                  {/* Logo en menú móvil */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 p-1">
                      <img 
                        src="/logo.svg" 
                        alt="LuisFernandoRealtor" 
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        LuisFernando
                      </span>
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        REALTOR
                      </span>
                    </div>
                  </div>

                  {/* Enlaces de navegación móvil */}
                  <nav className="flex flex-col space-y-4">
                    {navigationLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center space-x-3 text-base font-medium text-zinc-700 transition-colors hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400 py-2"
                        >
                          <Icon className="h-5 w-5" />
                          <span>{link.text}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Acciones móviles */}
                  <div className="flex flex-col space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    {isAuthenticated && (
                      <Button
                        onClick={() => { setMenuOpen(false); handleAdminPanel(); }}
                        variant="default"
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold shadow-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-200"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Panel Administrador
                      </Button>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Tema
                      </span>
                      <ThemeToggleButton />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
