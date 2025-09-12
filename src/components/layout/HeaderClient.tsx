"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";

export default function HeaderClient() {
  const pathname = usePathname() || "/";
  const { isAuthenticated } = useAuthContext();

  // showReturnHomeButton when in propiedades (including detalles) or contacto
  const cleanPath = pathname.split("?")[0] || "/";
  const showReturnHomeButton =
    cleanPath === "/contacto" || cleanPath.startsWith("/propiedades");

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Don't show header if user is authenticated and on desktop (they have sidebar)
  // OR if on admin routes
  const isAdminRoute = cleanPath.startsWith("/admin");
  const hasSidebar = isAuthenticated && isDesktop;

  // Show header when NOT desktop (mobile always), or when desktop and:
  // - User is NOT authenticated and on home, OR
  // - User is authenticated but NOT on desktop (no sidebar), OR
  // - Routes that need return button (but NOT when sidebar is visible)
  const showHeaderOnDesktop =
    (!isAuthenticated && cleanPath === "/") ||
    (!hasSidebar &&
      !isAdminRoute &&
      (cleanPath === "/" || showReturnHomeButton));
  const shouldRenderHeader = !isDesktop || (isDesktop && showHeaderOnDesktop);

  if (!shouldRenderHeader) return null;

  return <Header />;
}
