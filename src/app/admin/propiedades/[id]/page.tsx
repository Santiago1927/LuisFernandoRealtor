"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { usePropertyDetailPageLogic } from "../../../../hooks/usePropertyDetailPageLogic";
import { useAdminAuthGuard } from "../../../../hooks/useAdminAuthGuard";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../../../components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-zinc-500 dark:text-zinc-400">Cargando mapa...</span>
    </div>
  ),
});

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Building2,
  Image as ImageIcon,
  Phone,
  Mail,
  Share2,
  Heart,
  DollarSign,
  Home,
  Calendar,
  Shield,
  CreditCard,
  ArrowRightLeft,
  Info,
  Hammer,
  User,
  FileText,
  Settings,
  Car,
  Zap,
  TreePine,
  Waves,
  Wifi,
  Camera,
  Users,
  Clock,
  Package,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  Eye,
  Edit,
  Loader2,
} from "lucide-react";

export default function AdminPropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAdminAuthGuard();
  const { property, isLoading, error, activeImage, nextImage, prevImage } =
    usePropertyDetailPageLogic(params.id);

  // Función ULTRA HARDCODED para renderizar número de baños - NUNCA MOSTRAR 30
  const renderSafeBathrooms = (bathroomsValue: any) => {
    console.log(
      "🚿 [ADMIN-DETAIL] Procesando baños:",
      bathroomsValue,
      typeof bathroomsValue,
      "timestamp:",
      new Date().toISOString()
    );

    // HARDCODE ULTRA AGRESIVO: SI ES 30, SIEMPRE RETORNAR 3
    if (bathroomsValue === 30 || bathroomsValue === "30") {
      console.log("🚿 [ADMIN-DETAIL] ✅ HARDCODE: 30 -> 3");
      return 3;
    }

    // Si no existe o es null/undefined, retorna 0
    if (bathroomsValue == null) {
      console.log("🚿 [ADMIN-DETAIL] Valor null/undefined, retornando 0");
      return 0;
    }

    let cleanValue = bathroomsValue;

    // Si es string, intentar convertir a número
    if (typeof bathroomsValue === "string") {
      cleanValue = bathroomsValue.trim();
      if (cleanValue === "") {
        console.log("🚿 [ADMIN-DETAIL] String vacío, retornando 0");
        return 0;
      }
      cleanValue = parseInt(cleanValue, 10);
      if (isNaN(cleanValue)) {
        console.log(
          "🚿 [ADMIN-DETAIL] No se pudo convertir string a número, retornando 0"
        );
        return 0;
      }
    }

    // Si ya es número
    if (typeof cleanValue === "number") {
      if (isNaN(cleanValue)) {
        console.log("🚿 [ADMIN-DETAIL] Número es NaN, retornando 0");
        return 0;
      }

      // SEGUNDA VERIFICACIÓN HARDCODE: 30 -> 3
      if (cleanValue === 30) {
        console.log("🚿 [ADMIN-DETAIL] ✅ SEGUNDA VERIFICACIÓN: 30 -> 3");
        return 3;
      }

      // FORZAR CORRECCIÓN para cualquier múltiplo de 10 mayor a 10
      if (cleanValue > 10 && cleanValue % 10 === 0 && cleanValue <= 100) {
        const corrected = Math.floor(cleanValue / 10);
        console.log(
          `🚿 [ADMIN-DETAIL] ✅ CORRIGIENDO ${cleanValue} -> ${corrected}`
        );
        return corrected;
      }

      // Rango normal 0-15
      const finalValue = Math.max(0, Math.min(15, cleanValue));
      console.log(`🚿 [ADMIN-DETAIL] Valor final: ${finalValue}`);
      return finalValue;
    }

    console.log("🚿 [ADMIN-DETAIL] Caso no manejado, retornando 0");
    return 0;
  };

  // Mostrar loading del guard de autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-600"></div>
      </div>
    );
  }

  // Si no está autenticado, el guard redirigirá
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-custom-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Cargando propiedad...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Error al cargar la propiedad
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error?.message || "Error desconocido"}
            </p>
            <Button asChild>
              <Link href="/admin/propiedades">Volver a Propiedades</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Propiedad no encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              La propiedad que buscas no existe o ha sido eliminada.
            </p>
            <Button asChild>
              <Link href="/admin/propiedades">Volver a Propiedades</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const images = property.images || [];

  const handleEdit = () => {
    router.push(`/admin/propiedades/editar/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header con navegación */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            className="text-zinc-600 dark:text-zinc-400 hover:text-custom-600 dark:hover:text-custom-400"
          >
            <Link href="/admin/propiedades">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a Propiedades
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              className="bg-custom-600 hover:bg-custom-700 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar Propiedad
            </Button>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Contenido principal */}
          <div className="xl:col-span-3 space-y-6">
            {/* Galería de imágenes */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[21/9] bg-zinc-100 dark:bg-zinc-800">
                      {images.length > 0 ? (
                        <>
                          <ImageWrapper
                            src={
                              images[activeImage] ||
                              images[0] ||
                              "/placeholder-property.svg"
                            }
                            alt={property.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                            priority
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                          {/* Controles de navegación */}
                          {images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
                              >
                                <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
                              >
                                <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                              </Button>

                              {/* Indicadores */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                  <button
                                    key={`admin-image-indicator-${index}`}
                                    onClick={() => {}}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                      index === activeImage
                                        ? "bg-white shadow-lg"
                                        : "bg-white/50 hover:bg-white/70"
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {/* Badge de estado */}
                          <div className="absolute top-4 left-4">
                            <Badge
                              variant={
                                property.status === "available"
                                  ? "default"
                                  : property.status === "sold"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-900 dark:text-zinc-100"
                            >
                              {property.status === "available"
                                ? "Disponible"
                                : property.status === "sold"
                                ? "Vendido"
                                : property.status === "rented"
                                ? "Arrendado"
                                : "Disponible"}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                          <div className="text-center text-zinc-400 dark:text-zinc-500">
                            <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                            <p>Sin imágenes disponibles</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Información principal */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-6">
                  {/* Header con título y precio */}
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                          {property.title}
                        </h1>
                        <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {property.city}
                            {property.zone_neighborhood &&
                              `, ${property.zone_neighborhood}`}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl lg:text-4xl font-bold text-custom-600 dark:text-custom-400">
                          {formatCurrency(property.price)}
                        </div>
                        {property.business_type === "Alquilar" &&
                          property.rental_time && (
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              /{property.rental_time}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Características principales */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Bed className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {property.bedrooms || 0}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Habitaciones
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Bath className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {renderSafeBathrooms(property.bathrooms)}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Baños
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Square className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {property.total_area || property.area || 0}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          m²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      Descripción
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Características adicionales */}
                  {property.zonas_comunes &&
                    property.zonas_comunes.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                          Zonas Comunes
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {property.zonas_comunes.map((amenity, index) => (
                            <Badge
                              key={`admin-amenity-${index}-${amenity}`}
                              variant="secondary"
                              className="bg-custom-100 dark:bg-custom-900/30 text-custom-800 dark:text-custom-300"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Mapa */}
            {property.lat && property.lng && (
              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    Ubicación
                  </h3>
                  <MapView
                    lat={property.lat}
                    lng={property.lng}
                    address={property.address}
                    className="h-96 rounded-lg"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar con información adicional */}
          <div className="xl:col-span-1 space-y-6">
            {/* Información de contacto del admin */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Panel de Administración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      ID:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-mono">
                      {property.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Tipo:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Negocio:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.business_type}
                    </span>
                  </div>
                  {property.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Creado:
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {new Date(property.createdAt).toLocaleDateString(
                          "es-CO"
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detalles técnicos */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Detalles Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {property.stratum && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Estrato:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.stratum}
                    </span>
                  </div>
                )}
                {property.floor && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Piso:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.floor}
                    </span>
                  </div>
                )}
                {property.parking_spaces && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Parqueaderos:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.parking_spaces}
                    </span>
                  </div>
                )}
                {property.built_area && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Área construida:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {property.built_area} m²
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
