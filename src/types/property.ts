export type PropertyType = 'Local' | 'Bodega' | 'Lote' | 'Casa Lote' | 'Finca' | 'Casa Finca' | 'Oficina' | 'Apartaestudio' | 'Apartamento' | 'Penthouse' | 'Dúplex' | 'Tríplex' | 'Casa';

export type PaymentMethod = 'Crédito hipotecario' | 'Leasing' | 'Recursos propios' | 'Permutas';

export type ExchangeType = 'Vehículos' | 'Propiedades';

export type Amenity = 'piscina' | 'gym' | 'cancha de futbol' | 'sintética' | 'zona BBQ' | 'yoga' | 'zona de lectura' | 'juegos infantiles' | 'cancha de squash' | 'terraza' | 'turco' | 'sauna' | 'salón comunal' | 'recepción' | 'portería' | 'mirador' | 'senderos ecologistas' | 'zona de mascotas' | 'coworking' | 'cafetería' | 'cine' | 'salón de reuniones' | 'lobby' | 'parqueadero para visitantes';

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
  type: PropertyType;
  status: 'available' | 'sold' | 'rented';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  lat?: number | null;
  lng?: number | null;
  // Nuevos campos
  conjunto_cerrado?: boolean;
  valor_administracion?: number;
  zonas_comunes?: Amenity[];
  lote_frente?: number;
  lote_fondo?: number;
  numero_pisos?: number;
  formas_de_pago?: PaymentMethod[];
  tipo_permuta?: ExchangeType;
  permuta_porcentaje?: number;
  permuta_monto_max?: number;
  edad_propiedad?: string;
}

export interface PropertyFormData {
  title: string;
  address: string;
  city?: string;
  price: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: PropertyType;
  status: 'available' | 'sold' | 'rented';
  phone?: string;
  lat?: number | null;
  lng?: number | null;
  // Nuevos campos
  conjunto_cerrado?: boolean;
  valor_administracion?: number;
  zonas_comunes?: Amenity[];
  lote_frente?: number;
  lote_fondo?: number;
  numero_pisos?: number;
  formas_de_pago?: PaymentMethod[];
  tipo_permuta?: ExchangeType;
  permuta_porcentaje?: number;
  permuta_monto_max?: number;
  edad_propiedad?: string;
} 