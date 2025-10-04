"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { usePropertyDetailPageLogic } from "../../../hooks/usePropertyDetailPageLogic";
import { useAuthContext } from "../../../components/auth/AuthContext";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../../components/map/MapView"), {
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
} from "lucide-react";

export default function DetallePropiedadPage() {
  const { id } = useParams();
  const {
    property,
    isLoading,
    error,
    activeImage,
    images,
    nextImage,
    prevImage,
    mapUrl,
  } = usePropertyDetailPageLogic(id);
  const { isAuthenticated } = useAuthContext();

  // Función ULTRA SEGURA para renderizar ciudad - IMPOSIBLE que muestre "0"
  const renderSafeCity = (cityValue: any) => {
    // Si no existe, retorna null
    if (!cityValue) return null;

    // Si no es string, retorna null
    if (typeof cityValue !== "string") return null;

    // Limpiar el valor
    const cleanCity = cityValue.trim();

    // Si está vacío después del trim, retorna null
    if (cleanCity.length === 0) return null;

    // Si es exactamente "0", retorna null
    if (cleanCity === "0") return null;

    // Si es "null" o "undefined" como string, retorna null
    if (
      cleanCity.toLowerCase() === "null" ||
      cleanCity.toLowerCase() === "undefined"
    )
      return null;

    // Si llegamos aquí, es un valor válido
    return cleanCity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Cargando propiedad...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Error al cargar la propiedad
          </p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "available":
        return {
          label: "Disponible",
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
        };
      case "sold":
        return {
          label: "Vendida",
          className:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
        };
      default:
        return {
          label: "Alquilada",
          className:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        };
    }
  };

  const statusConfig = getStatusConfig(property.status);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <Button
            asChild
            variant="ghost"
            className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
          >
            <Link
              href={isAuthenticated ? "/admin/propiedades" : "/propiedades"}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a Propiedades
            </Link>
          </Button>
        </div>

        <div className="grid xl:grid-cols-4 gap-6 lg:gap-8">
          <div className="xl:col-span-3 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[21/9] bg-zinc-100 dark:bg-zinc-800">
                      {images.length > 0 ? (
                        <>
                          <SmartImage
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

                          {images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
                              >
                                <ChevronLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
                              >
                                <ChevronRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-zinc-400 dark:text-zinc-500">
                            <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                            <span className="text-lg">
                              Sin imágenes disponibles
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                          {property.title}
                        </h1>
                        <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-400 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{property.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="secondary"
                        className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
                      >
                        <Building2 className="w-3 h-3 mr-1" />
                        {property.type}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={statusConfig.className}
                      >
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Bed className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {property.bedrooms || 0}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Habitaciones
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Bath className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {property.bathrooms || 0}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Baños
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Square className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {property.total_area || property.area || 0}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          m²
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                        Descripción
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    {/* Información adicional de la propiedad */}
                    <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                      {/* Ciudad - VERSIÓN ULTRA SEGURA */}
                      {(() => {
                        const safeCity = renderSafeCity(property?.city);
                        if (!safeCity) return null;

                        return (
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                Ciudad
                              </div>
                              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {safeCity}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Valor de administración - SOLO SI ES MAYOR A 0 */}
                      {property.valor_administracion &&
                        Number(property.valor_administracion) > 0 && (
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                Administración
                              </div>
                              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {formatCurrency(property.valor_administracion)}
                                /mes
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Conjunto cerrado */}
                      {property.conjunto_cerrado && (
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                              Conjunto Cerrado
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              Sí
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Número de pisos */}
                      {property.numero_pisos && property.numero_pisos > 0 && (
                        <div className="flex items-center space-x-3">
                          <Home className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                              Número de Pisos
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              {property.numero_pisos} piso
                              {property.numero_pisos > 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Edad de la propiedad */}
                      {property.edad_propiedad && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                              Edad de la Propiedad
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              {property.edad_propiedad}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Secciones adicionales */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Dimensiones del lote (solo para lotes) */}
              {property.type === "Lote" &&
                (property.lote_frente || property.lote_fondo) && (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <Square className="w-5 h-5 text-amber-600" />
                        <span>Dimensiones del Lote</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {property.lote_frente && property.lote_frente > 0 && (
                          <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                              {property.lote_frente}m
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              Frente
                            </div>
                          </div>
                        )}
                        {property.lote_fondo && property.lote_fondo > 0 && (
                          <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                              {property.lote_fondo}m
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                              Fondo
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Zonas comunes */}
              {property.zonas_comunes && property.zonas_comunes.length > 0 && (
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                      <Building2 className="w-5 h-5 text-amber-600" />
                      <span>
                        Zonas Comunes ({property.zonas_comunes.length})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {property.zonas_comunes.map((zona) => (
                        <Badge
                          key={zona}
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          {zona}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Área construida */}
              {property.area_construida &&
                property.area_construida.length > 0 && (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <Hammer className="w-5 h-5 text-amber-600" />
                        <span>
                          Área Construida ({property.area_construida.length})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {property.area_construida.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Formas de pago */}
              {property.formas_de_pago &&
                property.formas_de_pago.length > 0 && (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                        <span>Formas de Pago</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {property.formas_de_pago.map((forma) => (
                          <Badge
                            key={forma}
                            variant="outline"
                            className="border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-300"
                          >
                            {forma}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Información de permutas */}
              {property.tipo_permuta && (
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                      <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                      <span>Acepta Permutas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Tipo:
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {property.tipo_permuta}
                        </span>
                      </div>
                      {property.permuta_porcentaje && (
                        <div className="flex justify-between">
                          <span className="text-zinc-600 dark:text-zinc-400">
                            Porcentaje que cubre:
                          </span>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {property.permuta_porcentaje}%
                          </span>
                        </div>
                      )}
                      {property.permuta_monto_max && (
                        <div className="flex justify-between">
                          <span className="text-zinc-600 dark:text-zinc-400">
                            Monto máximo:
                          </span>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {formatCurrency(property.permuta_monto_max)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Detalles Completos de la Propiedad */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                  <Info className="w-5 h-5 text-amber-600" />
                  <span>Información Detallada</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Datos Generales */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      Datos Generales
                    </h4>

                    {property.encargado_inmueble && (
                      <div className="flex items-start space-x-2">
                        <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Encargado
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                            {property.encargado_inmueble}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.matricula_inmobiliaria && (
                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Matrícula
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                            {property.matricula_inmobiliaria}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.title && (
                      <div className="flex items-start space-x-2">
                        <Home className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Título
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                            {property.title}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.business_type && (
                      <div className="flex items-start space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Tipo de negocio
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.business_type}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.status && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Estado
                          </div>
                          <Badge
                            variant="outline"
                            className={statusConfig.className}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {property.type && (
                      <div className="flex items-start space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Tipo de inmueble
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.type}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.currency_type && (
                      <div className="flex items-start space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Moneda
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.currency_type}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Información Técnica */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                      <Settings className="w-4 h-4 mr-2 text-green-600" />
                      Información Técnica
                    </h4>

                    {property.construction_year && (
                      <div className="flex items-start space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Año construcción
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.construction_year}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <Bed className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Habitaciones
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {property.bedrooms || 0}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Bath className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Baños
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {property.bathrooms || 0}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Square className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Área total
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {property.total_area || property.area || 0} m²
                        </div>
                      </div>
                    </div>

                    {property.built_area && property.built_area > 0 && (
                      <div className="flex items-start space-x-2">
                        <Square className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Área construida
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.built_area} m²
                          </div>
                        </div>
                      </div>
                    )}

                    {property.private_area && property.private_area > 0 && (
                      <div className="flex items-start space-x-2">
                        <Square className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Área privada
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.private_area} m²
                          </div>
                        </div>
                      </div>
                    )}

                    {property.stratum && property.stratum !== "N/D" && (
                      <div className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Estrato
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.stratum}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.floor && (
                      <div className="flex items-start space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Piso
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.floor}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Servicios y Amenidades */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                      <Star className="w-4 h-4 mr-2 text-purple-600" />
                      Servicios y Amenidades
                    </h4>

                    {property.parking_spaces &&
                      property.parking_spaces !== "0 Vehículos" && (
                        <div className="flex items-start space-x-2">
                          <Car className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Parqueadero
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.parking_spaces}
                            </div>
                          </div>
                        </div>
                      )}

                    {property.parking_type && (
                      <div className="flex items-start space-x-2">
                        <Car className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Tipo parqueadero
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.parking_type}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.has_storage_area && (
                      <div className="flex items-start space-x-2">
                        <Package className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Depósito
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Sí
                          </div>
                        </div>
                      </div>
                    )}

                    {property.zonas_comunes &&
                      property.zonas_comunes.length > 0 && (
                        <div className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Amenidades
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {property.zonas_comunes.map((amenidad, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {amenidad}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    {property.edad_propiedad && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Edad de la propiedad
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.edad_propiedad}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.rental_time && (
                      <div className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Tiempo de alquiler
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {property.rental_time}
                          </div>
                        </div>
                      </div>
                    )}

                    {property.rental_price &&
                      Number(property.rental_price) > 0 && (
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Precio alquiler
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {formatCurrency(property.rental_price)}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Información Adicional */}
                  {(property.country ||
                    property.department ||
                    property.address ||
                    property.phone) && (
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-red-600" />
                        Ubicación y Contacto
                      </h4>

                      {property.country && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              País
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.country}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.department && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Departamento
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.department}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Dirección
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                              {property.address}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.phone && (
                        <div className="flex items-start space-x-2">
                          <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Teléfono
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.phone}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Información adicional */}
                  {(property.encargado_inmueble ||
                    property.matricula_inmobiliaria ||
                    property.publication_status ||
                    property.business_type) && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                        <FileText className="w-4 h-4 mr-2 text-blue-600" />
                        Información del Inmueble
                      </h4>

                      {property.encargado_inmueble && (
                        <div className="flex items-start space-x-2">
                          <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Encargado del inmueble
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.encargado_inmueble}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.matricula_inmobiliaria && (
                        <div className="flex items-start space-x-2">
                          <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Matrícula inmobiliaria
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.matricula_inmobiliaria}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.publication_status && (
                        <div className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Estado de publicación
                            </div>
                            <Badge
                              variant={
                                property.publication_status === "Destacado"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {property.publication_status}
                            </Badge>
                          </div>
                        </div>
                      )}

                      {property.business_type && (
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Tipo de negocio
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.business_type}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.zone_neighborhood && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Zona/Barrio
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.zone_neighborhood}
                            </div>
                          </div>
                        </div>
                      )}

                      {property.postal_code && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Código postal
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.postal_code}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Otros campos adicionales */}
                  {(property.conjunto_cerrado ||
                    property.valor_administracion ||
                    property.video_url ||
                    property.virtual_tour) && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                        <Building2 className="w-4 h-4 mr-2 text-green-600" />
                        Características Adicionales
                      </h4>

                      {property.conjunto_cerrado && (
                        <div className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Conjunto cerrado
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Sí
                            </div>
                          </div>
                        </div>
                      )}

                      {property.valor_administracion &&
                        property.valor_administracion > 0 && (
                          <div className="flex items-start space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Valor administración
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(property.valor_administracion)}
                              </div>
                            </div>
                          </div>
                        )}

                      {property.video_url && (
                        <div className="flex items-start space-x-2">
                          <PlayCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Video
                            </div>
                            <a
                              href={property.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                            >
                              Ver video
                            </a>
                          </div>
                        </div>
                      )}

                      {property.virtual_tour && (
                        <div className="flex items-start space-x-2">
                          <Eye className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Tour virtual
                            </div>
                            <a
                              href={property.virtual_tour}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                            >
                              Ver tour virtual
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mapa de ubicación */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>Ubicación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapView
                  address={property.address}
                  lat={property.lat || undefined}
                  lng={property.lng || undefined}
                  draggable={false}
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="sticky top-6 space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">
                      {formatCurrency(property.price)}
                    </div>
                    <div className="text-amber-100 text-sm">
                      Precio de venta
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-zinc-100">
                    Contactar Agente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
                  >
                    <a
                      href={
                        property.phone
                          ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(
                              property.phone.replace(/\s+/g, "")
                            )}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar Ahora
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <Link href="/contacto">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </Link>
                  </Button>
                  <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Agente: Luis Fernando
                    </p>
                    <p className="mt-1">+57 321 422 3931</p>
                    <p className="text-xs mt-2 text-zinc-500 dark:text-zinc-500">
                      Agente Certificado
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-zinc-100">
                    Información Adicional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isAuthenticated && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Referencia
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        #{id}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Tipo
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Estado
                    </span>
                    <Badge
                      variant="secondary"
                      className={statusConfig.className}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                  {(() => {
                    const safeCity = renderSafeCity(property?.city);
                    if (!safeCity) return null;

                    return (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Ciudad
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {safeCity}
                        </span>
                      </div>
                    );
                  })()}
                  {property.conjunto_cerrado && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Conjunto cerrado
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        Sí
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Información de multimedia */}
              {(property.images?.length > 0 || property.videos?.length > 0) && (
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-zinc-900 dark:text-zinc-100">
                      Multimedia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {property.images && property.images.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Imágenes
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {property.images.length}
                        </span>
                      </div>
                    )}
                    {property.videos && property.videos.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Videos
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {property.videos.length}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
