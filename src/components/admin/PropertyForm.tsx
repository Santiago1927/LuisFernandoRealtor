"use client";

import React, { useState } from "react";
import {
  Property,
  PropertyType,
  Amenity,
  PaymentMethod,
  ExchangeType,
  AreaConstruida,
  PublicationStatus,
  BusinessType,
  CurrencyType,
  RentalTime,
  Stratum,
  FloorNumber,
  ParkingType,
} from "../../types/property";
import { usePropertyFormLogic } from "../../hooks/usePropertyFormLogic";
import { useAuthContext } from "../auth/AuthContext";
import AddressInputWithMap from "../map/AddressInputWithMap";
import { MultiSelect } from "../ui/multi-select";
import { Switch } from "../ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrencyInput, parseCurrency } from "@/utils/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Image as ImageIcon,
  Video,
  Save,
  Loader2,
  Phone,
  Home,
  Shield,
  Eye,
  EyeOff,
  Settings,
  CreditCard,
  Calendar,
  HelpCircle,
} from "lucide-react";
import MediaPreview from "./MediaPreview";

// Propiedades del componente PropertyForm
interface PropertyFormProps {
  property?: Property | null; // Propiedad existente para editar (opcional)
  onSave: (property: Property) => void; // Función callback para guardar la propiedad
  onClose: () => void; // Función callback para cerrar el formulario
}

// Constantes para las opciones del formulario de propiedades
const PROPERTY_TYPES: PropertyType[] = [
  "Apartaestudio",
  "Apartamento",
  "Bodega",
  "Bungalow",
  "Cabaña",
  "Campestre",
  "Campos, Chacras y Quintas",
  "Casa",
  "Casa de Playa",
  "Chalet",
  "Condominio",
  "Consultorio",
  "Cortijo",
  "Dúplex",
  "Edificio",
  "Finca",
  "Finca - Hoteles",
  "Galpon Industrial",
  "Parqueadero",
  "Hostal",
  "Local",
  "Lote",
  "Oficina",
  "Penthouse",
  "Tríplex",
];

// Estados de publicación disponibles
const PUBLICATION_STATUS: PublicationStatus[] = [
  "Destacado",
  "Activo",
  "Inactivo",
];

// Tipos de negocio disponibles
const BUSINESS_TYPES: BusinessType[] = ["Vender", "Permutar"];

// Tipos de moneda disponibles
const CURRENCY_TYPES: CurrencyType[] = [
  "Pesos colombianos",
  "Dólares americanos",
  "Euros",
];

// Tiempos de alquiler disponibles
const RENTAL_TIMES: RentalTime[] = ["Mensual", "Diario", "Semanal", "Anual"];

// Estratos disponibles
const STRATUMS: Stratum[] = ["N/D", "1", "2", "3", "4", "5", "6"];

// Números de piso disponibles
const FLOOR_NUMBERS: FloorNumber[] = [
  "N/A",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
];

const AMENITIES: Amenity[] = [
  "piscina",
  "gym",
  "cancha de futbol",
  "sintética",
  "zona BBQ",
  "yoga",
  "zona de lectura",
  "juegos infantiles",
  "cancha de squash",
  "terraza",
  "turco",
  "sauna",
  "salón comunal",
  "recepción",
  "portería",
  "mirador",
  "senderos ecologistas",
  "zona de mascotas",
  "coworking",
  "cafetería",
  "cine",
  "salón de reuniones",
  "lobby",
  "parqueadero para visitantes",
];

// Métodos de pago disponibles para las propiedades
const PAYMENT_METHODS: PaymentMethod[] = [
  "Crédito hipotecario o leasing",
  "Recursos propios",
  "Permutas",
];

// Tipos de intercambio disponibles
const EXCHANGE_TYPES: ExchangeType[] = ["Vehículos", "Propiedades"];

// Opciones para área construida adicional
const AREA_CONSTRUIDA_OPTIONS: AreaConstruida[] = [
  "Área de balcones",
  "Área de terraza",
  "Área privada",
  "Parqueadero",
  "Bodega",
];

/**
 * Componente PropertyForm - Formulario para crear y editar propiedades
 * Permite gestionar todos los aspectos de una propiedad inmobiliaria
 */
export default function PropertyForm({
  property,
  onSave,
  onClose,
}: PropertyFormProps) {
  // Verificar estado de autenticación
  const { isAuthenticated, user } = useAuthContext();

  // Hook personalizado que maneja toda la lógica del formulario
  const {
    formData, // Datos del formulario
    images, // Archivos de imágenes seleccionadas
    videos, // Archivos de videos seleccionados
    uploading, // Estado de carga durante el guardado
    imageUrls, // URLs de imágenes subidas
    videoUrls, // URLs de videos subidos
    mapAddress, // Dirección seleccionada en el mapa
    setMapAddress, // Función para actualizar la dirección del mapa
    lat, // Latitud de la ubicación
    lng, // Longitud de la ubicación
    handleInputChange, // Función para manejar cambios en inputs
    handleImageChange, // Función para manejar selección de imágenes
    handleVideoChange, // Función para manejar selección de videos
    removeNewImage, // Función para eliminar imágenes nuevas
    removeNewVideo, // Función para eliminar videos nuevos
    removeExistingImage, // Función para eliminar imágenes existentes
    removeExistingVideo, // Función para eliminar videos existentes
    handleSubmit, // Función para enviar el formulario
    handleLocationChange, // Función para manejar cambios de ubicación
    handleSpecialFieldChange, // Función para campos especiales
    onClose: handleClose, // Función para cerrar el formulario
  } = usePropertyFormLogic({ property, onSave, onClose });

  // Funciones auxiliares para el componente
  // Función para formatear valores monetarios en pesos colombianos
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Verificar si el tipo de propiedad es un lote (para mostrar campos específicos)
  const isLote = formData.type === "Lote";
  const isCasa =
    formData.type?.toLowerCase().includes("casa") || formData.type === "Casa";
  const hasPermutas = formData.formas_de_pago?.includes("Permutas");

  // Estado para controlar la visualización de todos los datos del formulario
  const [showFormData, setShowFormData] = useState(false);

  // Verificar autenticación antes de mostrar el formulario
  if (!isAuthenticated || !user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-red-600 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Acceso Restringido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Debes estar autenticado para crear o editar propiedades.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-zinc-300 text-zinc-600 hover:bg-zinc-100"
              >
                Cerrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white/95 dark:bg-zinc-900/95">
        <CardHeader className="border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-custom-500 to-custom-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {property ? "Editar Propiedad" : "Nueva Propiedad"}
                </CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {property
                    ? "Modifica los datos de la propiedad"
                    : "Crea una nueva propiedad"}
                </p>
                <div className="mt-2 p-3 bg-custom-50 dark:bg-custom-900/20 border border-custom-200 dark:border-custom-800 rounded-lg">
                  <p className="text-xs text-custom-800 dark:text-custom-200">
                    ℹ️ Los campos marcados con{" "}
                    <span className="text-red-500 font-bold">*</span> son
                    obligatorios. Usuario:{" "}
                    <span className="font-semibold">{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowFormData(!showFormData)}
                className="border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700"
                title={
                  showFormData
                    ? "Ocultar datos del formulario"
                    : "Ver todos los datos del formulario"
                }
              >
                {showFormData ? (
                  <EyeOff className="w-4 h-4 mr-1" />
                ) : (
                  <Eye className="w-4 h-4 mr-1" />
                )}
                {showFormData ? "Ocultar" : "Ver Datos"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Sección de visualización de datos del formulario */}
        {showFormData && (
          <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Datos del formulario
              </h3>

              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-auto max-h-96 whitespace-pre-wrap">
                  {JSON.stringify(
                    {
                      ...formData,
                      images: images?.length || 0,
                      videos: videos?.length || 0,
                      imageUrls: imageUrls?.length || 0,
                      videoUrls: videoUrls?.length || 0,
                      mapAddress,
                      coordinates: { lat, lng },
                    },
                    null,
                    2
                  )}
                </pre>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <div className="font-semibold text-blue-700 dark:text-blue-300">
                      Archivos
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      Imágenes: {images?.length || 0}
                      <br />
                      Videos: {videos?.length || 0}
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                    <div className="font-semibold text-green-700 dark:text-green-300">
                      URLs
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      Imágenes: {imageUrls?.length || 0}
                      <br />
                      Videos: {videoUrls?.length || 0}
                    </div>
                  </div>

                  <div className="bg-custom-50 dark:bg-custom-900/20 p-2 rounded">
                    <div className="font-semibold text-custom-700 dark:text-custom-300">
                      Ubicación
                    </div>
                    <div className="text-custom-600 dark:text-custom-400">
                      Lat: {lat?.toFixed(6) || "N/A"}
                      <br />
                      Lng: {lng?.toFixed(6) || "N/A"}
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                    <div className="font-semibold text-purple-700 dark:text-purple-300">
                      Estado
                    </div>
                    <div className="text-purple-600 dark:text-purple-400">
                      Guardando: {uploading ? "Sí" : "No"}
                      <br />
                      Tipo: {formData.type || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Sección de Datos Generales */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Datos generales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Encargado del inmueble */}
                    <div>
                      <Label
                        htmlFor="encargado_inmueble"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Encargado del inmueble
                      </Label>
                      <Input
                        id="encargado_inmueble"
                        type="text"
                        name="encargado_inmueble"
                        value={formData.encargado_inmueble || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Nombre del encargado del inmueble"
                      />
                    </div>

                    {/* Título inmueble */}
                    <div>
                      <Label
                        htmlFor="title"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Título inmueble <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Nombre corto para identificar el inmueble (obligatorio)"
                      />
                    </div>

                    {/* Estado de la publicación */}
                    <div>
                      <Label
                        htmlFor="publication_status"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Estado de la publicación
                      </Label>
                      <Select
                        name="publication_status"
                        value={formData.publication_status || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "publication_status",
                            value as PublicationStatus
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Destacado" />
                        </SelectTrigger>
                        <SelectContent>
                          {PUBLICATION_STATUS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tipo de inmueble */}
                    <div>
                      <Label
                        htmlFor="type"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Tipo de inmueble
                      </Label>
                      <Select
                        name="type"
                        value={formData.type}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "type",
                            value as PropertyType
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Apartaestudio" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {PROPERTY_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Precio de venta */}
                    <div>
                      <Label
                        htmlFor="price"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Precio de venta <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="text"
                        name="price"
                        value={
                          formData.price
                            ? formatCurrencyInput(formData.price.toString())
                            : ""
                        }
                        onChange={(e) => {
                          const numericValue = parseCurrency(e.target.value);
                          handleInputChange({
                            target: {
                              name: "price",
                              value: numericValue ? parseInt(numericValue) : 0,
                            },
                          } as any);
                        }}
                        required
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Ingresa el precio de venta"
                      />
                    </div>

                    {/* Administración */}
                    <div>
                      <Label
                        htmlFor="valor_administracion"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Administración
                      </Label>
                      <Input
                        id="valor_administracion"
                        type="text"
                        name="valor_administracion"
                        value={
                          formData.valor_administracion
                            ? formatCurrencyInput(
                                formData.valor_administracion.toString()
                              )
                            : ""
                        }
                        onChange={(e) => {
                          const numericValue = parseCurrency(e.target.value);
                          handleInputChange({
                            target: {
                              name: "valor_administracion",
                              value: numericValue ? parseInt(numericValue) : 0,
                            },
                          } as any);
                        }}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Ingresa el valor de administración"
                      />
                    </div>

                    {/* Estado físico de la propiedad */}
                    <div>
                      <Label
                        htmlFor="physical_state"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Estado físico de la propiedad
                      </Label>
                      <Select
                        name="physical_state"
                        value={formData.edad_propiedad || ""}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "edad_propiedad", value },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Usado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nuevo">Nuevo</SelectItem>
                          <SelectItem value="Nuevo">Sobre planos</SelectItem>
                          <SelectItem value="Usado">Usado</SelectItem>
                          <SelectItem value="En construcción">
                            En construcción
                          </SelectItem>
                          <SelectItem value="Por remodelar">
                            Por remodelar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Baños */}
                    <div>
                      <Label
                        htmlFor="bathrooms"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Baños
                      </Label>
                      <Select
                        name="bathrooms"
                        value={formData.bathrooms?.toString() || ""}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: {
                              name: "bathrooms",
                              value: parseInt(value),
                            },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="half_bathroom"
                          className="mr-2"
                        />
                        <label
                          htmlFor="half_bathroom"
                          className="text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          Baño medio
                        </label>
                      </div>
                    </div>

                    {/* Bodega */}
                    <div>
                      <Label
                        htmlFor="storage_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Bodega
                      </Label>
                      <div className="flex">
                        <Input
                          id="storage_area"
                          type="number"
                          name="storage_area"
                          value={formData.storage_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Video */}
                    <div>
                      <Label
                        htmlFor="video_url"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Video
                      </Label>
                      <Input
                        id="video_url"
                        type="url"
                        name="video_url"
                        value={formData.video_url || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Enlace de youtube.com, vimeo.com o archivo de video para navegador"
                      />
                    </div>

                    {/* Tour Virtual */}
                    <div>
                      <Label
                        htmlFor="virtual_tour"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Tour virtual (Ver soportados)
                      </Label>
                      <Input
                        id="virtual_tour"
                        type="url"
                        name="virtual_tour"
                        value={formData.virtual_tour || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Enlace al Tour Virtual 360"
                      />
                    </div>

                    {/* Áreas Disponibles */}
                    <div className="col-span-full border-t pt-4">
                      <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                        <Square className="w-4 h-4 mr-2 text-custom-600" />
                        Áreas con las que cuenta la propiedad
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_total_area"
                              name="has_total_area"
                              checked={formData.has_total_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_total_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área total/terreno
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_built_area"
                              name="has_built_area"
                              checked={formData.has_built_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_built_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área construida
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_private_area"
                              name="has_private_area"
                              checked={formData.has_private_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_private_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área privada
                            </label>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_balcony_area"
                              name="has_balcony_area"
                              checked={formData.has_balcony_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_balcony_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área de balcones
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_terrace_area"
                              name="has_terrace_area"
                              checked={formData.has_terrace_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_terrace_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área de terraza
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="has_storage_area"
                              name="has_storage_area"
                              checked={formData.has_storage_area || false}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-custom-600 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 rounded focus:ring-custom-500 dark:focus:ring-custom-400"
                            />
                            <label
                              htmlFor="has_storage_area"
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              Área de bodega
                            </label>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                        Selecciona las áreas con las que cuenta la propiedad
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Matrícula Inmobiliaria */}
                    <div>
                      <Label
                        htmlFor="matricula_inmobiliaria"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Matrícula inmobiliaria
                      </Label>
                      <Input
                        id="matricula_inmobiliaria"
                        name="matricula_inmobiliaria"
                        value={formData.matricula_inmobiliaria || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Identificador oficial del inmueble"
                      />
                    </div>

                    {/* Tipo de negocio */}
                    <div>
                      <Label
                        htmlFor="business_type"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Tipo de negocio
                      </Label>
                      <Select
                        name="business_type"
                        value={formData.business_type || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "business_type",
                            value as BusinessType
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Vender" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUSINESS_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tipo moneda */}
                    <div>
                      <Label
                        htmlFor="currency_type"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Tipo moneda
                      </Label>
                      <Select
                        name="currency_type"
                        value={formData.currency_type || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "currency_type",
                            value as CurrencyType
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Pesos colombianos" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCY_TYPES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Año construcción */}
                    <div>
                      <Label
                        htmlFor="construction_year"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Año construcción
                      </Label>
                      <Input
                        id="construction_year"
                        name="construction_year"
                        value={formData.construction_year || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Ejemplo: 1980"
                      />
                    </div>

                    {/* Alcobas */}
                    <div>
                      <Label
                        htmlFor="bedrooms"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Alcobas
                      </Label>
                      <Select
                        name="bedrooms"
                        value={formData.bedrooms?.toString() || ""}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: {
                              name: "bedrooms",
                              value: parseInt(value),
                            },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Parqueadero */}
                    <div>
                      <Label
                        htmlFor="parking_spaces"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Parqueadero
                      </Label>
                      <Select
                        name="parking_spaces"
                        value={formData.parking_spaces || ""}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: {
                              name: "parking_spaces",
                              value: value,
                            },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="0 Vehículos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0 Vehículos">
                            0 Vehículos
                          </SelectItem>
                          <SelectItem value="1 Vehículo">1 Vehículo</SelectItem>
                          <SelectItem value="2 Vehículos">
                            2 Vehículos
                          </SelectItem>
                          <SelectItem value="3 Vehículos">
                            3 Vehículos
                          </SelectItem>
                          <SelectItem value="4 Vehículos">
                            4 Vehículos
                          </SelectItem>
                          <SelectItem value="5+ Vehículos">
                            5+ Vehículos
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tipo de Parqueadero */}
                    <div>
                      <Label
                        htmlFor="parking_type"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Tipo de parqueadero
                      </Label>
                      <Select
                        name="parking_type"
                        value={formData.parking_type || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "parking_type",
                            value as ParkingType
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="En línea" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="En línea">En línea</SelectItem>
                          <SelectItem value="En paralelo">
                            En paralelo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Estrato */}
                    <div>
                      <Label
                        htmlFor="stratum"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Estrato
                      </Label>
                      <Select
                        name="stratum"
                        value={formData.stratum || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange("stratum", value as Stratum)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="N/D" />
                        </SelectTrigger>
                        <SelectContent>
                          {STRATUMS.map((stratum) => (
                            <SelectItem key={stratum} value={stratum}>
                              {stratum}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Piso */}
                    <div>
                      <Label
                        htmlFor="floor"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Piso
                      </Label>
                      <Select
                        name="floor"
                        value={formData.floor || ""}
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "floor",
                            value as FloorNumber
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="24" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {FLOOR_NUMBERS.map((floor) => (
                            <SelectItem key={floor} value={floor}>
                              {floor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Área total / terreno */}
                    <div>
                      <Label
                        htmlFor="total_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Área total / terreno
                      </Label>
                      <div className="flex">
                        <Input
                          id="total_area"
                          type="number"
                          name="total_area"
                          value={formData.total_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Área construida */}
                    <div>
                      <Label
                        htmlFor="built_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Área construida
                      </Label>
                      <div className="flex">
                        <Input
                          id="built_area"
                          type="number"
                          name="built_area"
                          value={formData.built_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Área privada */}
                    <div>
                      <Label
                        htmlFor="private_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Área privada
                      </Label>
                      <div className="flex">
                        <Input
                          id="private_area"
                          type="number"
                          name="private_area"
                          value={formData.private_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Área de balcones */}
                    <div>
                      <Label
                        htmlFor="balcony_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Área de balcones
                      </Label>
                      <div className="flex">
                        <Input
                          id="balcony_area"
                          type="number"
                          name="balcony_area"
                          value={formData.balcony_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Área de terraza */}
                    <div>
                      <Label
                        htmlFor="terrace_area"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Área de terraza
                      </Label>
                      <div className="flex">
                        <Input
                          id="terrace_area"
                          type="number"
                          name="terrace_area"
                          value={formData.terrace_area || ""}
                          onChange={handleInputChange}
                          min="0"
                          step="0.1"
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400 rounded-r-none"
                        />
                        <Select defaultValue="m²">
                          <SelectTrigger className="mt-1 w-20 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="ft²">ft²</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zonas Comunes */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 block">
                    Zonas comunes
                  </Label>
                  <MultiSelect
                    options={AMENITIES.map((amenity) => ({
                      value: amenity,
                      label: amenity,
                    }))}
                    selected={formData.zonas_comunes || []}
                    onChange={(selected) =>
                      handleSpecialFieldChange(
                        "zonas_comunes",
                        selected as Amenity[]
                      )
                    }
                    placeholder="Selecciona las zonas comunes disponibles (opcional)..."
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                  />
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Selecciona todas las zonas comunes disponibles
                  </p>
                </div>

                {/* Detalles de la Casa (condicional) */}
                {isCasa && (
                  <div className="mt-6 border-t pt-6">
                    <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                      <Home className="w-4 h-4 mr-2 text-custom-600" />
                      Detalles de la casa
                    </h4>
                    <div className="w-full">
                      <Label
                        htmlFor="numero_pisos"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        ¿Cuántos pisos?
                      </Label>
                      <Select
                        value={
                          formData.numero_pisos
                            ? formData.numero_pisos.toString()
                            : "0"
                        }
                        onValueChange={(value) =>
                          handleSpecialFieldChange(
                            "numero_pisos",
                            value === "0" ? undefined : parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Seleccionar número de pisos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">N/A</SelectItem>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} piso{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Formas de Pago */}
                <div className="mt-6 border-t pt-6">
                  <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-custom-600" />
                    Formas de pago
                  </h4>
                  <MultiSelect
                    options={PAYMENT_METHODS.map((method) => ({
                      value: method,
                      label: method,
                    }))}
                    selected={formData.formas_de_pago || []}
                    onChange={(selected) =>
                      handleSpecialFieldChange(
                        "formas_de_pago",
                        selected as PaymentMethod[]
                      )
                    }
                    placeholder="Selecciona las formas de pago disponibles..."
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                  />

                  {/* Campos condicionales para Permutas */}
                  {hasPermutas && (
                    <div className="mt-4 p-4 bg-custom-50 dark:bg-custom-900/20 rounded-lg border border-custom-200 dark:border-custom-800">
                      <h5 className="text-sm font-semibold text-custom-800 dark:text-custom-200 mb-3">
                        Detalles de la permuta
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="tipo_permuta"
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                          >
                            Tipo de permuta
                          </Label>
                          <Select
                            value={formData.tipo_permuta || ""}
                            onValueChange={(value) =>
                              handleSpecialFieldChange(
                                "tipo_permuta",
                                value as ExchangeType
                              )
                            }
                          >
                            <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                              <SelectValue placeholder="Selecciona tipo de permuta" />
                            </SelectTrigger>
                            <SelectContent>
                              {EXCHANGE_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="permuta_porcentaje"
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                          >
                            Porcentaje que cubre (%)
                          </Label>
                          <Input
                            id="permuta_porcentaje"
                            type="number"
                            name="permuta_porcentaje"
                            value={formData.permuta_porcentaje || ""}
                            onChange={handleInputChange}
                            min="1"
                            max="100"
                            className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                            placeholder="Ej. 50"
                          />
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                            Porcentaje del valor de la propiedad (1-100%)
                          </p>
                        </div>

                        <div>
                          <Label
                            htmlFor="permuta_monto_max"
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                          >
                            Monto máximo (COP) - opcional
                          </Label>
                          <div className="relative mt-1">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input
                              id="permuta_monto_max"
                              type="number"
                              name="permuta_monto_max"
                              value={formData.permuta_monto_max || ""}
                              onChange={handleInputChange}
                              min="0"
                              className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                              placeholder="Ej. 50000000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sección de Ubicación geográfica */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Ubicación geográfica
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* País */}
                    <div>
                      <Label
                        htmlFor="country"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        País
                      </Label>
                      <Select
                        name="country"
                        value={formData.country || "Colombia"}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "country", value },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Colombia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Colombia">Colombia</SelectItem>
                          <SelectItem value="Estados Unidos">
                            Estados Unidos
                          </SelectItem>
                          <SelectItem value="México">México</SelectItem>
                          <SelectItem value="España">España</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Departamento */}
                    <div>
                      <Label
                        htmlFor="department"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Departamento
                      </Label>
                      <Select
                        name="department"
                        value={formData.department || "Nariño"}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "department", value },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Nariño" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nariño">Nariño</SelectItem>
                          <SelectItem value="Antioquia">Antioquia</SelectItem>
                          <SelectItem value="Cundinamarca">
                            Cundinamarca
                          </SelectItem>
                          <SelectItem value="Valle del Cauca">
                            Valle del cauca
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ciudad */}
                    <div>
                      <Label
                        htmlFor="city"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Ciudad
                      </Label>
                      <Select
                        name="city"
                        value={formData.city || "Pasto"}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "city", value },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Pasto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pasto">Pasto</SelectItem>
                          <SelectItem value="Medellín">Medellín</SelectItem>
                          <SelectItem value="Bogotá">Bogotá</SelectItem>
                          <SelectItem value="Cali">Cali</SelectItem>
                          <SelectItem value="Chachagüí">Chachagüí</SelectItem>
                          <SelectItem value="Consacá">Consacá</SelectItem>
                          <SelectItem value="Buesaco">Buesaco</SelectItem>
                          <SelectItem value="Remolino">Remolino</SelectItem>
                          <SelectItem value="Sandona">Sandona</SelectItem>
                          <SelectItem value="San Fernando">
                            San Fernando
                          </SelectItem>
                          <SelectItem value="Catambuco">Catambuco</SelectItem>
                          <SelectItem value="La Cocha">La Cocha</SelectItem>
                          <SelectItem value="Túquerres">Túquerres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Zona / barrio */}
                    <div>
                      <Label
                        htmlFor="zone_neighborhood"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Zona / barrio <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        name="zone_neighborhood"
                        value={formData.zone_neighborhood || ""}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "zone_neighborhood", value },
                          } as any)
                        }
                      >
                        <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Centro">Centro</SelectItem>
                          <SelectItem value="Norte">Norte</SelectItem>
                          <SelectItem value="Sur">Sur</SelectItem>
                          <SelectItem value="Oriente">Oriente</SelectItem>
                          <SelectItem value="Occidente">Occidente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Código postal */}
                    <div>
                      <Label
                        htmlFor="postal_code"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Código postal
                      </Label>
                      <Input
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code || ""}
                        onChange={handleInputChange}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                      />
                    </div>

                    {/* Dirección */}
                    <div>
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        Dirección (Información privada){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        required
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                        placeholder="Dirección del inmueble, solo es visible por el administrador (obligatorio)"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Ubicación en mapa */}
                    <div>
                      <Label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 block">
                        Ubicación en mapa
                      </Label>
                      <AddressInputWithMap
                        label=""
                        placeholder="Seleccionar ubicación del inmueble"
                        name="map_location"
                        initialAddress={mapAddress}
                        initialCoordinates={lat && lng ? [lat, lng] : undefined}
                        onLocationChange={(address, lat, lng) =>
                          handleLocationChange(lat, lng, address)
                        }
                        mapHeight="300px"
                        draggable={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Descripción */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Descripción
                </h3>
                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                    placeholder="Describe las características y beneficios de la propiedad... (opcional)"
                  />
                </div>
              </div>
            </div>

            {/* Campos condicionales para Lote */}
            {isLote && (
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <Square className="w-4 h-4 mr-2 text-custom-600" />
                  Dimensiones del lote
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="lote_frente"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Frente (m)
                    </Label>
                    <Input
                      id="lote_frente"
                      type="number"
                      name="lote_frente"
                      value={formData.lote_frente || ""}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                      placeholder="Ej. 12.5"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lote_fondo"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Fondo (m)
                    </Label>
                    <Input
                      id="lote_fondo"
                      type="number"
                      name="lote_fondo"
                      value={formData.lote_fondo || ""}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                      placeholder="Ej. 30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sección de Medios */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                Medios
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="images"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Imágenes</span>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Selecciona múltiples imágenes de la propiedad
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="videos"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Videos</span>
                  </Label>
                  <Input
                    id="videos"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoChange}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-custom-500 dark:focus:border-custom-400"
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Selecciona videos de la propiedad (opcional)
                  </p>
                </div>
              </div>

              {/* Vista previa de imágenes */}
              <MediaPreview
                files={images}
                existingUrls={imageUrls}
                type="image"
                onRemoveFile={removeNewImage}
                onRemoveExisting={removeExistingImage}
              />

              {/* Vista previa de videos */}
              <MediaPreview
                files={videos}
                existingUrls={videoUrls}
                type="video"
                onRemoveFile={removeNewVideo}
                onRemoveExisting={removeExistingVideo}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={uploading}
                className="bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700 text-white font-semibold"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {property ? "Actualizar" : "Crear"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
