'use client';

import React from 'react';
import { Property } from '../../types/property';
import { usePropertyFormLogic } from '../../hooks/usePropertyFormLogic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Loader2
} from "lucide-react";

interface PropertyFormProps {
  property?: Property | null;
  onSave: (property: Property) => void;
  onClose: () => void;
}

export default function PropertyForm({ property, onSave, onClose }: PropertyFormProps) {
  const {
    formData,
    images,
    videos,
    uploading,
    imageUrls,
    videoUrls,
    mapAddress,
    setMapAddress,
    lat,
    lng,
    handleInputChange,
    handleImageChange,
    handleVideoChange,
    handleSubmit,
    onClose: handleClose,
  } = usePropertyFormLogic({ property, onSave, onClose });

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
                  {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
                </CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {property ? 'Modifica los datos de la propiedad' : 'Crea una nueva propiedad'}
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
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Título *
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

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Dirección *
                  </Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      id="address"
                      name="address"
                      value={mapAddress}
                      onChange={e => { setMapAddress(e.target.value); handleInputChange(e); }}
                      required
                      className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                      placeholder="Ingresa la dirección completa"
                    />
                  </div>
                  {lat && lng && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                      <iframe
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Ciudad
                  </Label>
                  <Select name="city" value={formData.city} onValueChange={(value) => handleInputChange({ target: { name: 'city', value } } as any)}>
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
                  <Label htmlFor="price" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Precio *
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
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Tipo de Propiedad
                  </Label>
                  <Select name="type" value={formData.type} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } } as any)}>
                    <SelectTrigger className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="apartment">Apartamento</SelectItem>
                      <SelectItem value="commercial">Comercial</SelectItem>
                      <SelectItem value="land">Terreno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Estado
                  </Label>
                  <Select name="status" value={formData.status} onValueChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}>
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
                    <Label htmlFor="bedrooms" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
                    <Label htmlFor="bathrooms" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
                    <Label htmlFor="area" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
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

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
                <Label htmlFor="images" className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
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
                  <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {imageUrls.length} imagen{imageUrls.length !== 1 ? 'es' : ''} actual{imageUrls.length !== 1 ? 'es' : ''}
                  </Badge>
                )}
              </div>

              <div>
                <Label htmlFor="videos" className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
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
                  <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {videoUrls.length} video{videoUrls.length !== 1 ? 's' : ''} actual{videoUrls.length !== 1 ? 'es' : ''}
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
                    {property ? 'Actualizar' : 'Crear'}
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
