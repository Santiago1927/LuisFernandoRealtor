/**
 * Interfaz que define la estructura completa de una propiedad inmobiliaria
 * Representa una entidad de propiedad tal como se almacena en la base de datos
 * @param id - Identificador único de la propiedad (generado automáticamente)
 * @param title - Título o nombre descriptivo de la propiedad
 * @param address - Dirección física completa de la propiedad
 * @param city - Ciudad donde se encuentra la propiedad (opcional)
 * @param price - Precio de la propiedad en pesos colombianos
 * @param description - Descripción detallada de la propiedad
 * @param images - Array de URLs de imágenes de la propiedad
 * @param videos - Array de URLs de videos de la propiedad
 * @param bedrooms - Número de habitaciones (opcional)
 * @param bathrooms - Número de baños (opcional)
 * @param area - Área total de la propiedad en metros cuadrados (opcional)
 * @param type - Tipo de propiedad (casa, apartamento, comercial, terreno)
 * @param status - Estado actual de la propiedad (disponible, vendida, alquilada)
 * @param createdAt - Fecha y hora de creación del registro
 * @param updatedAt - Fecha y hora de la última actualización
 * @param lat - Latitud geográfica de la propiedad (opcional)
 * @param lng - Longitud geográfica de la propiedad (opcional)
 */
export interface Property {
  id: string;
  title: string;
  address: string;
  city?: string;
  price: number;
  description: string;
  images: string[];
  videos: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented';
  createdAt: Date;
  updatedAt: Date;
  lat?: number | null;
  lng?: number | null;
}

/**
 * Interfaz que define la estructura de datos para formularios de propiedades
 * Se utiliza para crear y actualizar propiedades, excluyendo campos generados automáticamente
 * @param title - Título o nombre descriptivo de la propiedad
 * @param address - Dirección física completa de la propiedad
 * @param city - Ciudad donde se encuentra la propiedad (opcional)
 * @param price - Precio de la propiedad en pesos colombianos
 * @param description - Descripción detallada de la propiedad
 * @param bedrooms - Número de habitaciones (opcional)
 * @param bathrooms - Número de baños (opcional)
 * @param area - Área total de la propiedad en metros cuadrados (opcional)
 * @param type - Tipo de propiedad (casa, apartamento, comercial, terreno)
 * @param status - Estado actual de la propiedad (disponible, vendida, alquilada)
 * @param lat - Latitud geográfica de la propiedad (opcional)
 * @param lng - Longitud geográfica de la propiedad (opcional)
 */
export interface PropertyFormData {
  title: string;
  address: string;
  city?: string;
  price: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented';
  lat?: number | null;
  lng?: number | null;
} 