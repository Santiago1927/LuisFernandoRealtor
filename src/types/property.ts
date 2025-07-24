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