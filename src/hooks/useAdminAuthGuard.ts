import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../components/auth/AuthContext";

export function useAdminAuthGuard() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo redirigir si no está cargando, no está autenticado Y está en una ruta admin
    if (!loading && !isAuthenticated && pathname?.startsWith("/admin")) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router, pathname]);

  return { isAuthenticated, loading };
}
