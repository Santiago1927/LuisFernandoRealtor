"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ImageWrapper from "@/components/ui/ImageWrapper";
import PropertyMediaGallery from "@/components/property/PropertyMediaGallery";
import PropertyComments from "@/components/comments/PropertyComments";
import { usePropertyDetailPageLogic } from "../../../hooks/usePropertyDetailPageLogic";
import { useAuthContext } from "../../../components/auth/AuthContext";
import { useToggleFeaturedProperty } from "../../../hooks/useToggleFeaturedProperty";
import { useAlert } from "../../../components/layout/AlertContext";
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
  Award,
  Loader2,
  Video,
} from "lucide-react";

export default function DetallePropiedadPage() {
  const { id } = useParams();
  const {
    property,
    isLoading,
    error,
    activeImage,
    images,
    videos,
    nextImage,
    prevImage,
    mapUrl,
  } = usePropertyDetailPageLogic(id);
  const { isAuthenticated } = useAuthContext();
  const toggleFeaturedMutation = useToggleFeaturedProperty();
  const { showAlert, showConfirm } = useAlert();

  // Estados para likes y compartir
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shares, setShares] = useState(0);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    if (id) {
      const savedLikes = localStorage.getItem(`property-likes-${id}`);
      const savedIsLiked = localStorage.getItem(`property-liked-${id}`);
      const savedShares = localStorage.getItem(`property-shares-${id}`);

      if (savedLikes) setLikes(parseInt(savedLikes));
      if (savedIsLiked) setIsLiked(savedIsLiked === "true");
      if (savedShares) setShares(parseInt(savedShares));
    }
  }, [id]);

  // Handler: Compartir propiedad por WhatsApp
  const handleShare = () => {
    if (!property) return;
    const newSharesCount = shares + 1;
    setShares(newSharesCount);
    localStorage.setItem(`property-shares-${id}`, newSharesCount.toString());
    const propertyUrl = window.location.href;
    const message = `¡Mira esta increíble propiedad! 🏠\n\n*${
      property.title
    }*\n📍 ${property.address}\n💰 ${formatCurrency(
      property.price,
    )}\n\n${propertyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handler: Destacar propiedad
  const handleToggleFeatured = () => {
    if (!property || !isAuthenticated) return;
    const isFeatured = property.publication_status === "Destacado";
    const action = isFeatured ? "quitar el destacado" : "destacar";
    showConfirm(
      `¿Estás seguro de que quieres ${action} esta propiedad?`,
      async () => {
        try {
          await toggleFeaturedMutation.mutateAsync({
            id: property.id,
            featured: !isFeatured,
          });
          showAlert(
            isFeatured
              ? "Propiedad quitada de destacados exitosamente"
              : "Propiedad destacada exitosamente",
            "success",
          );
        } catch (error) {
          console.error("Error al cambiar estado destacado:", error);
          showAlert(
            "Error al cambiar el estado de la propiedad. Intenta de nuevo.",
            "error",
          );
        }
      },
    );
  };

  // Helper: Ciudad segura
  const renderSafeCity = (cityValue: any) => {
    if (!cityValue) return null;
    if (typeof cityValue === "number" && cityValue === 0) return null;
    if (typeof cityValue !== "string") return null;
    const cleanCity = cityValue.trim();
    if (cleanCity.length === 0) return null;
    if (cleanCity === "0") return null;
    if (
      cleanCity.toLowerCase() === "null" ||
      cleanCity.toLowerCase() === "undefined"
    )
      return null;
    return cleanCity;
  };

  // Helper: Baños seguro
  const renderSafeBathrooms = (bathroomsValue: any) => {
    if (bathroomsValue === 30 || bathroomsValue === "30") {
      return 3;
    }
    if (bathroomsValue == null) {
      return 0;
    }
    let value = bathroomsValue;
    if (typeof value === "string") {
      value = value.trim();
      if (value === "") {
        return 0;
      }
      value = parseInt(value, 10);
      if (isNaN(value)) {
        return 0;
      }
    }
    if (typeof value === "number") {
      if (isNaN(value)) {
        return 0;
      }
      if (value === 30) {
        return 3;
      }
      if (value > 10 && value % 10 === 0 && value <= 100) {
        return Math.floor(value / 10);
      }
      return Math.max(0, Math.min(15, value));
    }
    return 0;
  };

  /**
   * Helper: Valida si un valor debe ser renderizado
   * Retorna true solo si el valor es válido y no es un placeholder
   *
   * @param value - El valor a validar
   * @param allowZero - Si se permite el valor 0 (por defecto false)
   * @returns boolean - true si el valor debe ser mostrado
   */
  const shouldRenderValue = (
    value: any,
    allowZero: boolean = false,
  ): boolean => {
    // Valores nulos o undefined
    if (value === null || value === undefined) return false;

    // Strings vacíos o solo espacios
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") return false;
      if (trimmed === "0" && !allowZero) return false;
      if (trimmed.toLowerCase() === "null") return false;
      if (trimmed.toLowerCase() === "undefined") return false;
      if (trimmed === "N/D") return false;
      // Verifica si es solo ceros
      if (/^0+$/.test(trimmed) && !allowZero) return false;
      return true;
    }

    // Números
    if (typeof value === "number") {
      if (isNaN(value)) return false;
      if (value === 0 && !allowZero) return false;
      return true;
    }

    return false;
  };

  /**
   * Helper: Obtiene un valor limpio y seguro para renderizar
   *
   * @param value - El valor a limpiar
   * @returns string | number | null - El valor limpio o null si no es válido
   */
  const getSafeValue = (value: any): string | number | null => {
    if (!shouldRenderValue(value)) return null;

    if (typeof value === "string") {
      return value.trim();
    }

    return value;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-600 mx-auto mb-4"></div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Cargando propiedad...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 flex items-center justify-center">
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
            "bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800",
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-6">
          <Button
            asChild
            variant="ghost"
            className="text-zinc-600 dark:text-zinc-400 hover:text-custom-600 dark:hover:text-custom-400"
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
                    <PropertyMediaGallery
                      images={images}
                      videos={videos}
                      videoUrl={property.video_url}
                      virtualTour={property.virtual_tour}
                      propertyTitle={property.title}
                    />
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
                        <div className="flex flex-col items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setIsLiked(!isLiked);
                              setLikes(isLiked ? likes - 1 : likes + 1);
                              localStorage.setItem(
                                `property-liked-${id}`,
                                (!isLiked).toString(),
                              );
                              localStorage.setItem(
                                `property-likes-${id}`,
                                (isLiked ? likes - 1 : likes + 1).toString(),
                              );
                            }}
                            className={`${
                              isLiked
                                ? "text-red-500 hover:text-red-600"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-custom-600 dark:hover:text-custom-400"
                            } transition-colors`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isLiked ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                          {likes > 0 && (
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                              {likes}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShare}
                            className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            title="Compartir por WhatsApp"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                          {shares > 0 && (
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                              {shares}
                            </span>
                          )}
                        </div>
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
                        <Bed className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {(() => {
                            const bedroomsStr = String(
                              property.bedrooms || "",
                            ).trim();
                            const isOnlyZeros = /^0+$/.test(bedroomsStr);
                            return property.bedrooms &&
                              Number(property.bedrooms) > 0 &&
                              !isOnlyZeros
                              ? property.bedrooms
                              : "No aplica";
                          })()}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Habitaciones
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Bath className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {(() => {
                            const bathrooms = renderSafeBathrooms(
                              property.bathrooms,
                            );
                            return bathrooms > 0 ? bathrooms : "No aplica";
                          })()}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          Baños
                        </div>
                      </div>
                      <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                        <Square className="w-6 h-6 text-custom-600 dark:text-custom-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {(() => {
                            const area = property.total_area || property.area;
                            const areaStr = String(area || "").trim();
                            const isOnlyZeros = /^0+$/.test(areaStr);
                            const isValid =
                              area &&
                              !isNaN(Number(area)) &&
                              Number(area) > 0 &&
                              !isOnlyZeros;
                            return isValid ? area : "N/D";
                          })()}
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
                      {/* Ciudad */}
                      {(() => {
                        const value = getSafeValue(property.city);
                        if (!value) return null;
                        return (
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                Ciudad
                              </div>
                              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {value}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Valor de administración - SOLO SI ES MAYOR A 0 */}
                      {property.valor_administracion &&
                        Number(property.valor_administracion) > 0 && (
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-5 h-5 text-custom-600 dark:text-custom-400" />
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
                          <Shield className="w-5 h-5 text-custom-600 dark:text-custom-400" />
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

                      {/* Número de pisos - Solo para casas */}
                      {(() => {
                        const pisosStr = String(
                          property.numero_pisos ?? "",
                        ).trim();
                        const isOnlyZeros = /^0+$/.test(
                          pisosStr.replace(/\D/g, ""),
                        );
                        const isInvalid =
                          !pisosStr ||
                          isOnlyZeros ||
                          pisosStr === "" ||
                          pisosStr.toLowerCase() === "null" ||
                          pisosStr.toLowerCase() === "undefined" ||
                          pisosStr === "N/D" ||
                          pisosStr === "0";
                        if (
                          isInvalid ||
                          !property.numero_pisos ||
                          Number(property.numero_pisos) <= 0 ||
                          !(
                            property.type === "Casa" ||
                            property.type === "Casa de Playa" ||
                            property.type === "Campestre" ||
                            property.type === "Cabaña" ||
                            property.type === "Chalet" ||
                            property.type === "Cortijo" ||
                            property.type === "Finca" ||
                            property.type === "Finca - Hoteles" ||
                            property.type === "Bungalow" ||
                            property.type === "Condominio" ||
                            property.type === "Campos, Chacras y Quintas"
                          )
                        )
                          return null;
                        return (
                          <div className="flex items-center space-x-3">
                            <Home className="w-5 h-5 text-custom-600 dark:text-custom-400" />
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
                        );
                      })()}

                      {/* Piso - Solo para apartamentos */}
                      {(() => {
                        const value = getSafeValue(property.floor);
                        if (
                          !value ||
                          value === "N/A" ||
                          !(
                            property.type === "Apartamento" ||
                            property.type === "Dúplex" ||
                            property.type === "Tríplex" ||
                            property.type === "Apartaestudio" ||
                            property.type === "Penthouse" ||
                            property.type === "Edificio"
                          )
                        )
                          return null;
                        return (
                          <div className="flex items-center space-x-3">
                            <Building2 className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                Piso
                              </div>
                              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                Piso {value}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Edad de la propiedad */}
                      {(() => {
                        const value = getSafeValue(property.edad_propiedad);
                        if (!value) return null;
                        return (
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-custom-600 dark:text-custom-400" />
                            <div>
                              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                Edad de la Propiedad
                              </div>
                              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {value}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Secciones adicionales */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Dimensiones del lote (solo para lotes) */}
              {(() => {
                if (property.type !== "Lote") return null;
                if (!property.lote_frente && !property.lote_fondo) return null;
                if (property.lote_frente === 0 && property.lote_fondo === 0)
                  return null;
                return (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <Square className="w-5 h-5 text-custom-600" />
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
                );
              })()}

              {/* Zonas comunes */}
              {(() => {
                if (
                  !property.zonas_comunes ||
                  property.zonas_comunes.length === 0
                )
                  return null;
                return (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <Building2 className="w-5 h-5 text-custom-600" />
                        <span>
                          Zonas Comunes ({property.zonas_comunes.length})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {property.zonas_comunes.map((zona, index) => (
                          <Badge
                            key={`zona-${index}-${zona}`}
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            {zona}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Área construida */}
              {(() => {
                if (!property.area_construida) return null;
                const validAreas = property.area_construida.filter((area) => {
                  const areaStr = String(area || "").trim();
                  return areaStr !== "" && !/^0+$/.test(areaStr);
                });
                if (validAreas.length === 0) return null;
                return (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <Hammer className="w-5 h-5 text-custom-600" />
                        <span>Área Construida ({validAreas.length})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {validAreas.map((area, index) => (
                          <Badge
                            key={`area-${index}-${area}`}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Formas de pago */}
              {(() => {
                if (
                  !property.formas_de_pago ||
                  property.formas_de_pago.length === 0
                )
                  return null;
                return (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <CreditCard className="w-5 h-5 text-custom-600" />
                        <span>Formas de Pago</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {property.formas_de_pago.map((forma, index) => (
                          <Badge
                            key={`forma-pago-${index}-${forma}`}
                            variant="outline"
                            className="border-custom-300 text-custom-700 dark:border-custom-600 dark:text-custom-300"
                          >
                            {forma}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Información de permutas */}
              {(() => {
                if (!property.tipo_permuta) return null;
                return (
                  <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                        <ArrowRightLeft className="w-5 h-5 text-custom-600" />
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
                        {property.permuta_porcentaje &&
                          property.permuta_porcentaje > 0 && (
                            <div className="flex justify-between">
                              <span className="text-zinc-600 dark:text-zinc-400">
                                Porcentaje que cubre:
                              </span>
                              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                {property.permuta_porcentaje}%
                              </span>
                            </div>
                          )}
                        {property.permuta_monto_max &&
                          property.permuta_monto_max > 0 && (
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
                );
              })()}
            </div>

            {/* Detalles Completos de la Propiedad */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                  <Info className="w-5 h-5 text-custom-600" />
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
                    {/* Encargado - Solo para administradores */}
                    {isAuthenticated && property.encargado_inmueble && (
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
                    {(() => {
                      const value = String(
                        property.matricula_inmobiliaria || "",
                      ).trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      ) {
                        return null;
                      }
                      return (
                        <div className="flex items-start space-x-2">
                          <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Matrícula
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    {(() => {
                      const value = String(property.title || "").trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      )
                        return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Home className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Título
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    {(() => {
                      const value = String(property.business_type || "").trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      )
                        return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Tipo de negocio
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    {(() => {
                      const value = String(property.status || "").trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      )
                        return null;
                      return (
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
                      );
                    })()}
                    {(() => {
                      const value = String(property.type || "").trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      )
                        return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Building2 className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Tipo de inmueble
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    {(() => {
                      const value = String(property.currency_type || "").trim();
                      if (
                        !value ||
                        value === "0" ||
                        /^0+$/.test(value) ||
                        value.toLowerCase() === "null" ||
                        value.toLowerCase() === "undefined" ||
                        value === "N/D"
                      )
                        return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Moneda
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Información Técnica */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                      <Settings className="w-4 h-4 mr-2 text-green-600" />
                      Información Técnica
                    </h4>

                    {(() => {
                      const value = getSafeValue(property.construction_year);
                      if (!value) return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Año construcción
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {(() => {
                      const value = property.bedrooms;
                      if (!shouldRenderValue(value) || Number(value) <= 0)
                        return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Bed className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Habitaciones
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {(() => {
                      const bathrooms = renderSafeBathrooms(property.bathrooms);
                      return bathrooms > 0 ? (
                        <div className="flex items-start space-x-2">
                          <Bath className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Baños
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {bathrooms}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {(() => {
                      const totalArea = property.total_area || property.area;
                      const areaStr = String(totalArea || "").trim();
                      const isOnlyZeros = /^0+$/.test(areaStr);
                      const isInvalid =
                        !totalArea ||
                        isNaN(Number(totalArea)) ||
                        Number(totalArea) <= 0 ||
                        isOnlyZeros ||
                        areaStr === "" ||
                        areaStr.toLowerCase() === "null" ||
                        areaStr.toLowerCase() === "undefined" ||
                        areaStr === "N/D";
                      return !isInvalid ? (
                        <div className="flex items-start space-x-2">
                          <Square className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Área total
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {totalArea} m²
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {(() => {
                      const builtAreaStr = String(
                        property.built_area || "",
                      ).trim();
                      const isOnlyZeros = /^0+$/.test(builtAreaStr);
                      const isInvalid =
                        !property.built_area ||
                        isNaN(Number(property.built_area)) ||
                        Number(property.built_area) <= 0 ||
                        isOnlyZeros ||
                        builtAreaStr === "" ||
                        builtAreaStr.toLowerCase() === "null" ||
                        builtAreaStr.toLowerCase() === "undefined" ||
                        builtAreaStr === "N/D";
                      return !isInvalid ? (
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
                      ) : null;
                    })()}

                    {(() => {
                      const privateAreaStr = String(
                        property.private_area || "",
                      ).trim();
                      const isOnlyZeros = /^0+$/.test(privateAreaStr);
                      const isInvalid =
                        !property.private_area ||
                        isNaN(Number(property.private_area)) ||
                        Number(property.private_area) <= 0 ||
                        isOnlyZeros ||
                        privateAreaStr === "" ||
                        privateAreaStr.toLowerCase() === "null" ||
                        privateAreaStr.toLowerCase() === "undefined" ||
                        privateAreaStr === "N/D";
                      return !isInvalid ? (
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
                      ) : null;
                    })()}

                    {/* Área del lote - Solo para casas y fincas */}
                    {(() => {
                      const isHouseType =
                        property.type === "Casa" ||
                        property.type === "Finca" ||
                        property.type === "Casa de Playa" ||
                        property.type === "Cabaña" ||
                        property.type === "Campestre" ||
                        property.type === "Chalet" ||
                        property.type === "Cortijo" ||
                        property.type === "Campos, Chacras y Quintas";

                      if (!isHouseType) return null;

                      const lotAreaStr = String(property.lot_area || "").trim();
                      const isOnlyZeros = /^0+$/.test(lotAreaStr);
                      const isInvalid =
                        !property.lot_area ||
                        isNaN(Number(property.lot_area)) ||
                        Number(property.lot_area) <= 0 ||
                        isOnlyZeros ||
                        lotAreaStr === "" ||
                        lotAreaStr.toLowerCase() === "null" ||
                        lotAreaStr.toLowerCase() === "undefined" ||
                        lotAreaStr === "N/D";

                      return !isInvalid ? (
                        <div className="flex items-start space-x-2">
                          <Square className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Área del lote
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {property.lot_area} m²
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {(() => {
                      const value = getSafeValue(property.stratum);
                      if (!value || value === "N/D") return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Estrato
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Servicios y Amenidades */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                      <Star className="w-4 h-4 mr-2 text-purple-600" />
                      Servicios y Amenidades
                    </h4>

                    {(() => {
                      const parkingStr = String(
                        property.parking_spaces ?? "",
                      ).trim();
                      const isOnlyZeros = /^0+$/.test(
                        parkingStr.replace(/\D/g, ""),
                      );
                      const isInvalid =
                        !parkingStr ||
                        isOnlyZeros ||
                        parkingStr === "" ||
                        parkingStr.toLowerCase() === "null" ||
                        parkingStr.toLowerCase() === "undefined" ||
                        parkingStr === "N/D" ||
                        parkingStr === "0" ||
                        parkingStr === "0 Vehículos";
                      if (isInvalid || Number(parkingStr) <= 0) return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Car className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Parqueadero
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {parkingStr}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Tipo parqueadero - NO mostrar si es "0", solo ceros, vacío, null, undefined, "N/D" */}
                    {(() => {
                      const tipoStr = String(
                        property.parking_type ?? "",
                      ).trim();
                      const isOnlyZeros = /^0+$/.test(
                        tipoStr.replace(/\D/g, ""),
                      );
                      const isInvalid =
                        !tipoStr ||
                        isOnlyZeros ||
                        tipoStr === "" ||
                        tipoStr.toLowerCase() === "null" ||
                        tipoStr.toLowerCase() === "undefined" ||
                        tipoStr === "N/D" ||
                        tipoStr === "0";
                      if (isInvalid) return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <Car className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Tipo parqueadero
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {tipoStr}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

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
                              {property.zonas_comunes
                                .filter((amenidad) => {
                                  const amenidadStr = String(
                                    amenidad || "",
                                  ).trim();
                                  return (
                                    amenidadStr !== "" &&
                                    !/^0+$/.test(amenidadStr)
                                  );
                                })
                                .map((amenidad, index) => (
                                  <Badge
                                    key={`amenidad-${index}-${amenidad}`}
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

                    {(() => {
                      const value = getSafeValue(property.edad_propiedad);
                      if (!value) return null;
                      return (
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Estado de la propiedad
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

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
                  {(() => {
                    const hasLocation =
                      getSafeValue(property.country) ||
                      getSafeValue(property.department) ||
                      getSafeValue(property.city) ||
                      getSafeValue(property.address) ||
                      getSafeValue(property.phone);
                    if (!hasLocation) return null;
                    return (
                      <div className="space-y-4 md:col-span-2 lg:col-span-1">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-red-600" />
                          Ubicación y Contacto
                        </h4>

                        {(() => {
                          const value = getSafeValue(property.country);
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  País
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(property.department);
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Departamento
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(property.city);
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Ciudad
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(property.address);
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Dirección
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(property.phone);
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Teléfono
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}

                  {/* Información adicional */}
                  {(() => {
                    const hasInfo =
                      getSafeValue(property.matricula_inmobiliaria) ||
                      getSafeValue(property.publication_status) ||
                      getSafeValue(property.business_type);
                    if (!hasInfo) return null;
                    return (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          Información del Inmueble
                        </h4>

                        {(() => {
                          const value = getSafeValue(
                            property.matricula_inmobiliaria,
                          );
                          if (!value) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Matrícula inmobiliaria
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {value}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(
                            property.publication_status,
                          );
                          if (!value) return null;
                          return (
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
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(
                            property.zone_neighborhood,
                          );
                          if (!value) return null;
                          return (
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
                          );
                        })()}

                        {(() => {
                          const value = getSafeValue(property.postal_code);
                          if (!value) return null;
                          return (
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
                          );
                        })()}
                      </div>
                    );
                  })()}

                  {/* Otros campos adicionales */}
                  {(() => {
                    const hasOthers =
                      getSafeValue(property.conjunto_cerrado) ||
                      (property.valor_administracion &&
                        Number(property.valor_administracion) > 0) ||
                      getSafeValue(property.video_url) ||
                      getSafeValue(property.virtual_tour);
                    if (!hasOthers) return null;
                    return (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center mb-3">
                          <Building2 className="w-4 h-4 mr-2 text-green-600" />
                          Características Adicionales
                        </h4>

                        {(() => {
                          const value = getSafeValue(property.conjunto_cerrado);
                          if (!value) return null;
                          return (
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
                          );
                        })()}

                        {(() => {
                          const value = property.valor_administracion;
                          if (!value || Number(value) <= 0) return null;
                          return (
                            <div className="flex items-start space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Valor administración
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {formatCurrency(
                                    property.valor_administracion!,
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Información de medios disponibles */}
                        {((images && images.length > 0) ||
                          (videos && videos.length > 0) ||
                          property.video_url ||
                          property.virtual_tour) && (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 mb-3">
                              <Camera className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Medios Disponibles
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {images && images.length > 0 && (
                                <div className="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                  <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                      {images.length}{" "}
                                      {images.length === 1
                                        ? "Imagen"
                                        : "Imágenes"}
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                      En la galería superior
                                    </div>
                                  </div>
                                </div>
                              )}

                              {videos && videos.length > 0 && (
                                <div className="flex items-center space-x-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                                  <Video className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  <div>
                                    <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                                      {videos.length}{" "}
                                      {videos.length === 1 ? "Video" : "Videos"}
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                      En la galería superior
                                    </div>
                                  </div>
                                </div>
                              )}

                              {property.video_url && (
                                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                                  <PlayCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <div>
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                      Video Principal
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                      Incluido en galería
                                    </div>
                                  </div>
                                </div>
                              )}

                              {property.virtual_tour && (
                                <div className="flex items-center space-x-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                  <div>
                                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                      Tour Virtual
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                      Incluido en galería
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mt-3 p-3 bg-custom-50 dark:bg-custom-900/20 rounded-md border border-custom-200 dark:border-custom-800">
                              <p className="text-xs text-custom-700 dark:text-custom-300 text-center">
                                <Eye className="w-3 h-3 inline mr-1" />
                                Todos los medios están disponibles en la galería
                                interactiva superior
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Mapa de ubicación */}
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100">
                  <MapPin className="w-5 h-5 text-custom-600" />
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
              <Card className="border-0 shadow-xl bg-gradient-to-br from-custom-500 to-custom-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">
                      {formatCurrency(property.price)}
                    </div>
                    <div className="text-custom-100 text-sm">
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
                    className="w-full bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-semibold"
                  >
                    <a
                      href={
                        property.phone
                          ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(
                              property.phone.replace(/\s+/g, ""),
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
                      Agente: Realhaus
                    </p>
                    <p className="mt-1">+57 317 777 2601</p>
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
                    {(() => {
                      const tipoStr = String(property.type ?? "").trim();
                      const isOnlyZeros = /^0+$/.test(
                        tipoStr.replace(/\D/g, ""),
                      );
                      const isInvalid =
                        !tipoStr ||
                        isOnlyZeros ||
                        tipoStr === "" ||
                        tipoStr.toLowerCase() === "null" ||
                        tipoStr.toLowerCase() === "undefined" ||
                        tipoStr === "N/D" ||
                        tipoStr === "0";
                      if (isInvalid) return null;
                      return (
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {tipoStr}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Estado
                    </span>
                    {(() => {
                      const statusStr = String(property.status || "").trim();
                      const isOnlyZeros = /^0+$/.test(
                        statusStr.replace(/\D/g, ""),
                      );
                      const isInvalid =
                        !statusStr ||
                        isOnlyZeros ||
                        statusStr === "" ||
                        statusStr.toLowerCase() === "null" ||
                        statusStr.toLowerCase() === "undefined" ||
                        statusStr === "N/D" ||
                        statusStr === "0";
                      if (isInvalid) return null;
                      return (
                        <Badge
                          variant="secondary"
                          className={statusConfig.className}
                        >
                          {statusConfig.label}
                        </Badge>
                      );
                    })()}
                  </div>
                  {(() => {
                    const value = getSafeValue(property.city);
                    if (!value) return null;
                    return (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Ciudad
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {value}
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

              {/* Botón para destacar propiedad (solo para usuarios autenticados) */}
              {isAuthenticated && (
                <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-zinc-900 dark:text-zinc-100">
                      Gestión de Propiedad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={handleToggleFeatured}
                      disabled={toggleFeaturedMutation.isPending}
                      className={`w-full ${
                        property.publication_status === "Destacado"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white"
                      } font-semibold`}
                    >
                      {toggleFeaturedMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Procesando...
                        </>
                      ) : property.publication_status === "Destacado" ? (
                        <>
                          <Star className="w-4 h-4 mr-2 fill-current" />
                          Quitar Destacado
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4 mr-2" />
                          Destacar Propiedad
                        </>
                      )}
                    </Button>
                    <div className="mt-2 text-xs text-center text-zinc-500 dark:text-zinc-400">
                      {property.publication_status === "Destacado"
                        ? "Esta propiedad aparece en la sección destacadas"
                        : "Las propiedades destacadas aparecen en la página principal"}
                    </div>
                  </CardContent>
                </Card>
              )}

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

        {/* Sección de Comentarios */}
        <div className="mt-8">
          <PropertyComments propertyId={id as string} />
        </div>
      </div>
    </div>
  );
  // ...existing code...
}
