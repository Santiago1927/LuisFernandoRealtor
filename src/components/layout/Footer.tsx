"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ExternalLink,
  Heart,
} from "lucide-react";

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
    <footer
      className={`bg-gradient-to-br from-zinc-900 via-black to-amber-900/20 text-white ${lgPaddingClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/logo.svg"
                className="mr-3 h-10 w-10"
                alt="Luis Fernando Realtor"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-2xl font-bold text-white">Luis Fernando</h3>
                <p className="text-amber-400 font-medium">REALTOR</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed max-w-md">
              Especialistas en bienes raíces de lujo. Ofrecemos propiedades
              exclusivas y un servicio personalizado para clientes exigentes que
              buscan lo mejor.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-amber-500 mr-3"></span>
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-zinc-300 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 text-amber-500" />
                <a href="tel:+573214223931" className="hover:underline">
                  +57 321 422 3931
                </a>
              </div>
              <div className="flex items-center space-x-3 text-zinc-300 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4 text-amber-500" />
                <a
                  href="mailto:realtorluisfernando@gmail.com"
                  className="hover:underline"
                >
                  realtorluisfernando@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Pasto, Colombia</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-amber-500 mr-3"></span>
              Síguenos
            </h4>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/realhaus.luxury?igsh=c3NjOWF4aDJzMTY1&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-zinc-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="hover:underline">Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.tiktok.com/@realhaus.luxury?_t=ZS-90CAWBa7TWu&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-zinc-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <span className="hover:underline">TikTok</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.facebook.com/share/1N6jBeX4og/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-zinc-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <span className="hover:underline">Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-zinc-400 text-sm">
                © 2024{" "}
                <span className="text-amber-400 font-semibold">
                  Luis Fernando Realtor
                </span>{" "}
                ™ | Todos los derechos reservados
              </p>
            </div>

            <div className="flex items-center space-x-2 text-zinc-400 text-sm">
              <span>Desarrollado por</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <a
                href="https://santiagosalas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold hover:underline transition-colors"
              >
                Santiago Salas y Santiago Andrade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
