"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

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

export default function Footer() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        // @ts-ignore
        const detail = (e as CustomEvent)?.detail;
        if (detail && typeof detail.collapsed === "boolean") {
          setSidebarCollapsed(detail.collapsed);
        }
      } catch (err) {}
    };

    // initial read from localStorage if available
    try {
      const v = localStorage.getItem("sidebar_collapsed");
      if (v !== null) setSidebarCollapsed(v === "1");
    } catch (err) {}

    window.addEventListener("sidebar:change", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar:change", handler as EventListener);
  }, []);

  // compute a left padding class for large screens when sidebar is present
  // when sidebarCollapsed === false -> sidebar width is 16rem (w-64), collapsed -> 5rem (w-20)
  const lgPaddingClass =
    sidebarCollapsed === null
      ? "lg:pl-64"
      : sidebarCollapsed
      ? "lg:pl-20"
      : "lg:pl-64";

  return (
    <footer className="bg-gradient-to-br from-zinc-900 via-black to-custom-900/20 text-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* REALHAUS - Lado izquierdo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="mr-3 h-10 w-10 object-contain"
              alt="REALHAUS"
            />
            <h3
              className="text-2xl font-ultra-thin tracking-wide text-white font-cinzel"
              style={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              REALHAUS
            </h3>
          </div>

          {/* Contacto - Centro */}
          <div className="flex flex-col items-center text-center lg:text-left">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="w-8 h-0.5 bg-custom-500 mr-3"></span>
              Contacto
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center space-x-2 text-zinc-300 hover:text-custom-400 transition-colors">
                <Phone className="w-4 h-4 text-custom-500" />
                <a href="tel:+573214223931" className="hover:underline">
                  +57 321 422 3931
                </a>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300 hover:text-custom-400 transition-colors">
                <Phone className="w-4 h-4 text-custom-500" />
                <a href="tel:+573207917853" className="hover:underline">
                  +57 320 791 7853
                </a>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300 hover:text-custom-400 transition-colors">
                <Mail className="w-4 h-4 text-custom-500" />
                <a
                  href="mailto:realtorluisfernando@gmail.com"
                  className="hover:underline"
                >
                  realtorluisfernando@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-custom-500" />
                <span>Pasto, Colombia</span>
              </div>
            </div>
          </div>

          {/* Síguenos - Lado derecho */}
          <div className="flex flex-col items-center lg:items-end">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="w-8 h-0.5 bg-custom-500 mr-3"></span>
              Síguenos
            </h4>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/realhaus.luxury?igsh=c3NjOWF4aDJzMTY1&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="text-zinc-300 hover:text-custom-400 transition-colors duration-200 hover:scale-110 transform"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@realhaus.luxury?_t=ZS-90CAWBa7TWu&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en TikTok"
                className="text-zinc-300 hover:text-custom-400 transition-colors duration-200 hover:scale-110 transform"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1N6jBeX4og/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="text-zinc-300 hover:text-custom-400 transition-colors duration-200 hover:scale-110 transform"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="text-center">
            <p className="text-zinc-400 text-sm">
              © 2024{" "}
              <span className="text-custom-400 font-semibold">REALHAUS</span> ™
              | Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
