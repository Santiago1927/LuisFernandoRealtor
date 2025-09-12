"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Menu, Plus, LogOut } from "lucide-react";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useHeaderLogic } from "../../hooks/useHeaderLogic";
import PropertyForm from "@/components/admin/PropertyForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { href: "/propiedades", text: "Propiedades", icon: Building2 },
];

export default function Sidebar() {
  const { isAuthenticated, user, handleLogout } = useHeaderLogic();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showNewProperty, setShowNewProperty] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar_collapsed");
      if (v !== null) setCollapsed(v === "1");
    } catch (e) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebar_collapsed", collapsed ? "1" : "0");
      try {
        window.dispatchEvent(
          new CustomEvent("sidebar:change", { detail: { collapsed } })
        );
      } catch (e) {}
    } catch (e) {}
  }, [collapsed]);

  // Only render sidebar when user is authenticated
  if (!isAuthenticated) return null;

  const containerClass = collapsed
    ? "hidden lg:flex lg:flex-col lg:w-20 lg:h-screen lg:fixed lg:top-0 lg:left-0 bg-amber-50 dark:bg-zinc-900 border-r border-amber-200 dark:border-zinc-800 shadow-md p-3 lg:z-50"
    : "hidden lg:flex lg:flex-col lg:w-64 lg:h-screen lg:fixed lg:top-0 lg:left-0 bg-amber-50 dark:bg-zinc-900 border-r border-amber-200 dark:border-zinc-800 shadow-md p-6 lg:z-40";

  const linkTextClass = collapsed ? "hidden" : "inline";

  return (
    <aside className={containerClass} data-sidebar="main">
      <div className="hidden lg:flex justify-end mb-4">
        <button
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          onClick={() => setCollapsed((s) => !s)}
          className="p-2 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 shadow-sm border border-zinc-200 dark:border-zinc-700"
        >
          <Menu className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </button>
      </div>

      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "space-x-3"
        } mb-6`}
      >
        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-2 shadow-xl">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-amber-900 dark:text-white">
              LuisFernando
            </span>
            <span className="text-sm font-semibold text-amber-400 tracking-wider uppercase">
              Realtor
            </span>
          </div>
        )}
      </div>

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
          <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-200 font-semibold">
            {user?.email
              ? user.email.charAt(0).toUpperCase()
              : user?.displayName
              ? user.displayName.charAt(0).toUpperCase()
              : "A"}
          </div>
          {!collapsed && (
            <div className="flex-1">
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

      <nav className="flex-1">
        <ul className="space-y-2">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
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
                  <span className={`text-sm font-medium ${linkTextClass}`}>
                    {link.text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto px-3 py-4 w-full">
        {collapsed ? (
          <div className="mt-3 flex flex-col items-center gap-3">
            {/* 1 - Nueva Propiedad */}
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

            {/* 2 - Tema */}
            <div className="order-2">
              <div className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-transparent">
                <ThemeToggleButton />
              </div>
            </div>

            {/* 3 - Cerrar Sesión */}
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
          <div className="mt-3 flex flex-col gap-3">
            {/* 1 - Nueva Propiedad */}
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

            {/* 2 - Tema */}
            <div className="order-2 flex items-center justify-between p-2 rounded-md bg-white dark:bg-zinc-800 border dark:border-zinc-700">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Tema
              </span>
              <ThemeToggleButton />
            </div>

            {/* 3 - Cerrar Sesión */}
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

      {showNewProperty && (
        <PropertyForm
          property={null}
          onSave={() => setShowNewProperty(false)}
          onClose={() => setShowNewProperty(false)}
        />
      )}
    </aside>
  );
}
