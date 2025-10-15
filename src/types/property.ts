// Tipos de propiedades inmobiliarias disponibles en el sistema
export type PropertyType =
  | "Apartaestudio"
  | "Apartamento"
  | "Bodega"
  | "Bungalow"
  | "Cabaña"
  | "Campestre"
  | "Campos, Chacras y Quintas"
  | "Casa"
  | "Casa de Playa"
  | "Chalet"
  | "Condominio"
  | "Consultorio"
  | "Cortijo"
  | "Dúplex"
  | "Edificio"
  | "Finca"
  | "Finca - Hoteles"
  | "Galpon Industrial"
  | "Parqueadero"
  | "Hostal"
  | "Local"
  | "Lote"
  | "Oficina"
  | "Penthouse"
  | "Tríplex";

// Estados de publicación de las propiedades
export type PublicationStatus = "Destacado" | "Activo" | "Inactivo";

// Tipos de negocio inmobiliario
export type BusinessType = "Vender" | "Alquilar" | "Permutar";

// Tipos de moneda
export type CurrencyType = "Pesos colombianos" | "Dólares americanos" | "Euros";

// Tiempos de alquiler
export type RentalTime = "Mensual" | "Diario" | "Semanal" | "Anual";

// Estratos socioeconómicos
export type Stratum = "N/D" | "1" | "2" | "3" | "4" | "5" | "6";

// Tipos de parqueadero
export type ParkingType = "En línea" | "En paralelo";

// Número de pisos
export type FloorNumber =
  | "N/A"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25";

// Métodos de pago aceptados para las propiedades
export type PaymentMethod =
  | "Crédito hipotecario"
  | "Leasing"
  | "Recursos propios"
  | "Permutas";

// Tipos de intercambio disponibles para permutas
export type ExchangeType = "Vehículos" | "Propiedades";

// Amenidades y zonas comunes disponibles en las propiedades
export type Amenity =
  | "piscina"
  | "gym"
  | "cancha de futbol"
  | "sintética"
  | "zona BBQ"
  | "yoga"
  | "zona de lectura"
  | "juegos infantiles"
  | "cancha de squash"
  | "terraza"
  | "turco"
  | "sauna"
  | "salón comunal"
  | "recepción"
  | "portería"
  | "mirador"
  | "senderos ecologistas"
  | "zona de mascotas"
  | "coworking"
  | "cafetería"
  | "cine"
  | "salón de reuniones"
  | "lobby"
  | "parqueadero para visitantes";

// Tipos de área construida adicional
export type AreaConstruida =
  | "Área de balcones"
  | "Área de terraza"
  | "Área privada"
  | "Parqueadero"
  | "Bodega";

// Interfaz principal que define la estructura de una propiedad
export interface Property {
  id: string; // Identificador único de la propiedad
  title: string; // Título o nombre de la propiedad
  address: string; // Dirección física de la propiedad
  city?: string; // Ciudad donde se ubica la propiedad
  price: number; // Precio de venta o arriendo
  description: string; // Descripción detallada de la propiedad
  images: string[]; // URLs de las imágenes de la propiedad
  videos: string[]; // URLs de los videos de la propiedad
  bedrooms?: number; // Número de habitaciones
  bathrooms?: number; // Número de baños
  area?: number; // Área total en metros cuadrados
  type: PropertyType; // Tipo de propiedad
  status: "available" | "sold" | "rented"; // Estado de disponibilidad
  phone?: string; // Teléfono de contacto
  createdAt: Date; // Fecha de creación del registro
  updatedAt: Date; // Fecha de última actualización
  lat?: number | null; // Latitud de la ubicación
  lng?: number | null; // Longitud de la ubicación

  // Nuevos campos principales
  encargado_inmueble?: string; // Encargado del inmueble
  matricula_inmobiliaria?: string; // Matrícula inmobiliaria
  publication_status?: PublicationStatus; // Estado de la publicación
  business_type?: BusinessType; // Tipo de negocio
  rental_price?: number; // Precio de alquiler
  rental_time?: RentalTime; // Tiempo de alquiler
  currency_type?: CurrencyType; // Tipo de moneda
  construction_year?: string; // Año de construcción
  stratum?: Stratum; // Estrato
  floor?: FloorNumber; // Piso

  // Ubicación geográfica detallada
  country?: string; // País
  department?: string; // Departamento
  zone_neighborhood?: string; // Zona/barrio
  postal_code?: string; // Código postal
  private_area?: number; // Área privada
  built_area?: number; // Área construida
  total_area?: number; // Área total/terreno
  balcony_area?: number; // Área de balcones
  terrace_area?: number; // Área de terraza
  storage_area?: number; // Área de bodega

  // Checkboxes para indicar qué áreas tiene la propiedad
  has_private_area?: boolean; // Tiene área privada
  has_built_area?: boolean; // Tiene área construida
  has_total_area?: boolean; // Tiene área total/terreno
  has_balcony_area?: boolean; // Tiene área de balcones
  has_terrace_area?: boolean; // Tiene área de terraza
  has_storage_area?: boolean; // Tiene área de bodega

  video_url?: string; // Enlace de video
  virtual_tour?: string; // Tour virtual

  // Campos adicionales específicos del negocio inmobiliario
  conjunto_cerrado?: boolean; // Indica si está en conjunto cerrado
  valor_administracion?: number; // Valor mensual de administración
  zonas_comunes?: Amenity[]; // Amenidades y zonas comunes disponibles
  lote_frente?: number; // Frente del lote en metros
  lote_fondo?: number; // Fondo del lote en metros
  numero_pisos?: number; // Número de pisos de la propiedad
  formas_de_pago?: PaymentMethod[]; // Métodos de pago aceptados
  tipo_permuta?: ExchangeType; // Tipo de intercambio para permutas
  permuta_porcentaje?: number; // Porcentaje de permuta
  permuta_monto_max?: number; // Monto máximo para permuta
  edad_propiedad?: string; // Edad de la propiedad
  area_construida?: AreaConstruida[]; // Tipos de área construida adicional
  parking_type?: ParkingType; // Tipo de parqueadero (en línea o en paralelo)
  parking_spaces?: string; // Número de espacios de parqueadero (ej: "1 Vehículo", "2 Vehículos")
}

// Interfaz para los datos del formulario de propiedades
export interface PropertyFormData {
  title: string; // Título de la propiedad
  address: string; // Dirección de la propiedad
  city?: string; // Ciudad de la propiedad
  price: number; // Precio de la propiedad
  description: string; // Descripción de la propiedad
  bedrooms?: number; // Número de habitaciones
  bathrooms?: number; // Número de baños
  area?: number; // Área total en metros cuadrados
  type: PropertyType; // Tipo de propiedad
  status: "available" | "sold" | "rented"; // Estado de disponibilidad
  phone?: string; // Teléfono de contacto
  lat?: number | null; // Latitud de la ubicación
  lng?: number | null; // Longitud de la ubicación

  // Nuevos campos principales
  encargado_inmueble?: string; // Encargado del inmueble
  matricula_inmobiliaria?: string; // Matrícula inmobiliaria
  publication_status?: PublicationStatus; // Estado de la publicación
  business_type?: BusinessType; // Tipo de negocio
  rental_price?: number; // Precio de alquiler
  rental_time?: RentalTime; // Tiempo de alquiler
  currency_type?: CurrencyType; // Tipo de moneda
  construction_year?: string; // Año de construcción
  stratum?: Stratum; // Estrato
  floor?: FloorNumber; // Piso

  // Ubicación geográfica detallada
  country?: string; // País
  department?: string; // Departamento
  zone_neighborhood?: string; // Zona/barrio
  postal_code?: string; // Código postal
  private_area?: number; // Área privada
  built_area?: number; // Área construida
  total_area?: number; // Área total/terreno
  balcony_area?: number; // Área de balcones
  terrace_area?: number; // Área de terraza
  storage_area?: number; // Área de bodega

  // Checkboxes para indicar qué áreas tiene la propiedad
  has_private_area?: boolean; // Tiene área privada
  has_built_area?: boolean; // Tiene área construida
  has_total_area?: boolean; // Tiene área total/terreno
  has_balcony_area?: boolean; // Tiene área de balcones
  has_terrace_area?: boolean; // Tiene área de terraza
  has_storage_area?: boolean; // Tiene área de bodega

  video_url?: string; // Enlace de video
  virtual_tour?: string; // Tour virtual

  // Campos adicionales específicos del formulario
  conjunto_cerrado?: boolean; // Indica si está en conjunto cerrado
  valor_administracion?: number; // Valor mensual de administración
  zonas_comunes?: Amenity[]; // Amenidades y zonas comunes disponibles
  lote_frente?: number; // Frente del lote en metros
  lote_fondo?: number; // Fondo del lote en metros
  numero_pisos?: number; // Número de pisos de la propiedad
  formas_de_pago?: PaymentMethod[]; // Métodos de pago aceptados
  tipo_permuta?: ExchangeType; // Tipo de intercambio para permutas
  permuta_porcentaje?: number; // Porcentaje de permuta
  permuta_monto_max?: number; // Monto máximo para permuta
  edad_propiedad?: string; // Edad de la propiedad
  area_construida?: AreaConstruida[]; // Tipos de área construida adicional
  parking_type?: ParkingType; // Tipo de parqueadero (en línea o en paralelo)
  parking_spaces?: string; // Número de espacios de parqueadero (ej: "1 Vehículo", "2 Vehículos")
}
