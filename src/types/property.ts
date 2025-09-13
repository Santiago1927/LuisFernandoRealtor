// Tipos de propiedades inmobiliarias disponibles en el sistema
export type PropertyType =
  | "Local"
  | "Bodega"
  | "Lote"
  | "Casa Lote"
  | "Finca"
  | "Casa Finca"
  | "Oficina"
  | "Apartaestudio"
  | "Apartamento"
  | "Penthouse"
  | "Dúplex"
  | "Tríplex"
  | "Casa";

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
  | "Área de balcones y/o terraza"
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
}
