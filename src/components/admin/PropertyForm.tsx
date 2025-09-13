"use client";

import React from "react";
import {
  Property,
  PropertyType,
  Amenity,
  PaymentMethod,
  ExchangeType,
  AreaConstruida,
} from "../../types/property";
import { usePropertyFormLogic } from "../../hooks/usePropertyFormLogic";
import AddressInputWithMap from "../map/AddressInputWithMap";
import { MultiSelect } from "../ui/multi-select";
import { Switch } from "../ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Settings,
  CreditCard,
  Calendar,
  HelpCircle,
} from "lucide-react";

// Propiedades del componente PropertyForm
interface PropertyFormProps {
  property?: Property | null; // Propiedad existente para editar (opcional)
  onSave: (property: Property) => void; // Función callback para guardar la propiedad
  onClose: () => void; // Función callback para cerrar el formulario
}

// Constantes para las opciones del formulario de propiedades
const PROPERTY_TYPES: PropertyType[] = [
  "Local",
  "Bodega",
  "Lote",
  "Casa Lote",
  "Finca",
  "Casa Finca",
  "Oficina",
  "Apartaestudio",
  "Apartamento",
  "Penthouse",
  "Dúplex",
  "Tríplex",
  "Casa",
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
  "Crédito hipotecario",
  "Leasing",
  "Recursos propios",
  "Permutas",
];

// Tipos de intercambio disponibles
const EXCHANGE_TYPES: ExchangeType[] = ["Vehículos", "Propiedades"];

// Opciones para área construida adicional
const AREA_CONSTRUIDA_OPTIONS: AreaConstruida[] = [
  "Área de balcones y/o terraza",
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white/95 dark:bg-zinc-900/95">
        <CardHeader className="border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
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
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Título <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                    placeholder="Ej: Hermosa casa en el norte de Medellín"
                  />
                </div>

                {/* Input de dirección con autocompletado y mapa */}
                <AddressInputWithMap
                  label="Dirección"
                  placeholder="Ingresa la dirección completa (ej: Carrera 80 #45-23, Medellín)"
                  name="address"
                  required
                  initialAddress={formData.address}
                  initialCoordinates={lat && lng ? [lat, lng] : undefined}
                  onLocationChange={(address, lat, lng) =>
                    handleLocationChange(lat, lng, address)
                  }
                  mapHeight="300px"
                  draggable={true}
                />

                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Ciudad
                  </Label>
                  <Select
                    name="city"
                    value={formData.city}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "city", value },
                      } as any)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medellin">Medellín</SelectItem>
                      <SelectItem value="Bogota">Bogotá</SelectItem>
                      <SelectItem value="Cali">Cali</SelectItem>
                      <SelectItem value="Pasto">Pasto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Precio <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Teléfono de Contacto
                  </Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="type"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Tipo de Propiedad <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) =>
                      handleSpecialFieldChange("type", value as PropertyType)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    Estado
                  </Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "status", value },
                      } as any)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="sold">Vendida</SelectItem>
                      <SelectItem value="rented">Alquilada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="bedrooms"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Habitaciones
                    </Label>
                    <div className="relative mt-1">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input
                        id="bedrooms"
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        min="0"
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="bathrooms"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Baños
                    </Label>
                    <div className="relative mt-1">
                      <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input
                        id="bathrooms"
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        min="0"
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="area"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Área (m²)
                    </Label>
                    <div className="relative mt-1">
                      <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input
                        id="area"
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        min="0"
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Campos Adicionales */}
            <div className="space-y-6">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-amber-600" />
                  Información Adicional
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Conjunto Cerrado */}
                  <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Conjunto cerrado
                      </Label>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Selecciona si la propiedad está en conjunto cerrado
                      </p>
                    </div>
                    <Switch
                      checked={formData.conjunto_cerrado || false}
                      onCheckedChange={(checked: boolean) =>
                        handleSpecialFieldChange("conjunto_cerrado", checked)
                      }
                    />
                  </div>

                  {/* Valor de Administración */}
                  <div>
                    <Label
                      htmlFor="valor_administracion"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Valor de la administración (COP)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input
                        id="valor_administracion"
                        type="number"
                        name="valor_administracion"
                        value={formData.valor_administracion || ""}
                        onChange={handleInputChange}
                        min="0"
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="Ej. 120000"
                      />
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                      Ingrese el valor mensual en pesos
                    </p>
                  </div>

                  {/* Edad de la Propiedad */}
                  <div>
                    <Label
                      htmlFor="edad_propiedad"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Edad de la propiedad
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input
                        id="edad_propiedad"
                        type="text"
                        name="edad_propiedad"
                        value={formData.edad_propiedad || ""}
                        onChange={handleInputChange}
                        className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="Ej. 5 años / Nueva / 20 años aprox"
                      />
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                      Describe la antigüedad de la propiedad
                    </p>
                  </div>
                </div>

                {/* Área Construida */}
                <div className="col-span-full">
                  <Label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 block">
                    Área construida
                  </Label>
                  <MultiSelect
                    options={AREA_CONSTRUIDA_OPTIONS.map((area) => ({
                      value: area,
                      label: area,
                    }))}
                    selected={formData.area_construida || []}
                    onChange={(selected) =>
                      handleSpecialFieldChange(
                        "area_construida",
                        selected as AreaConstruida[]
                      )
                    }
                    placeholder="Selecciona las áreas construidas disponibles (opcional)..."
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                  />
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Selecciona todas las áreas construidas que incluye la
                    propiedad
                  </p>
                </div>
              </div>

              {/* Zonas Comunes */}
              <div>
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
                  className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                />
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  Selecciona todas las zonas comunes disponibles
                </p>
              </div>

              {/* Campos condicionales para Lote */}
              {isLote && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                    <Square className="w-4 h-4 mr-2 text-amber-600" />
                    Dimensiones del Lote
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
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
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
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
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                        placeholder="Ej. 30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Campos condicionales para Casa */}
              {isCasa && (
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                    <Home className="w-4 h-4 mr-2 text-amber-600" />
                    Detalles de la Casa
                  </h4>
                  <div className="w-full md:w-1/2">
                    <Label
                      htmlFor="numero_pisos"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      ¿Cuántos pisos?
                    </Label>
                    <Select
                      value={formData.numero_pisos?.toString() || ""}
                      onValueChange={(value) =>
                        handleSpecialFieldChange(
                          "numero_pisos",
                          parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                        <SelectValue placeholder="Seleccionar número de pisos" />
                      </SelectTrigger>
                      <SelectContent>
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
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-amber-600" />
                  Formas de Pago
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
                  className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                />

                {/* Campos condicionales para Permutas */}
                {hasPermutas && (
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h5 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-3">
                      Detalles de la Permuta
                    </h5>
                    <div className="grid md:grid-cols-3 gap-4">
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
                          <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
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
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
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
                            className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                            placeholder="Ej. 50000000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                placeholder="Describe las características y beneficios de la propiedad..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                />
                {imageUrls.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  >
                    {imageUrls.length} imagen
                    {imageUrls.length !== 1 ? "es" : ""} actual
                    {imageUrls.length !== 1 ? "es" : ""}
                  </Badge>
                )}
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
                  className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                />
                {videoUrls.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  >
                    {videoUrls.length} video{videoUrls.length !== 1 ? "s" : ""}{" "}
                    actual{videoUrls.length !== 1 ? "es" : ""}
                  </Badge>
                )}
              </div>
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
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
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
