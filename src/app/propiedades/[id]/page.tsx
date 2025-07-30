'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePropertyDetailPageLogic } from '../../../hooks/usePropertyDetailPageLogic';
import MapView from '../../../components/map/MapView';
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
  Heart
} from "lucide-react";

export default function DetallePropiedadPage() {
  const { id } = useParams();
  const { property, isLoading, error, activeImage, images, nextImage, prevImage, mapUrl } = usePropertyDetailPageLogic(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Error al cargar la propiedad</p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponible',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800'
        };
      case 'sold':
        return {
          label: 'Vendida',
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800'
        };
      default:
        return {
          label: 'Alquilada',
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        };
    }
  };

  const statusConfig = getStatusConfig(property.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        <div className="mb-6">
          <Button variant="ghost" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver a Propiedades
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
                          <img
                            src={images[activeImage]}
                            alt={property.title}
                            className="w-full h-full object-cover"
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
                            <span className="text-lg">Sin imágenes disponibles</span>
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
                        <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400">
                          <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700">
                        <Building2 className="w-3 h-3 mr-1" />
                        {property.type}
                      </Badge>
                      <Badge variant="secondary" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {property.bedrooms && (
                        <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                          <Bed className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{property.bedrooms}</div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">Habitaciones</div>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                          <Bath className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{property.bathrooms}</div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">Baños</div>
                        </div>
                      )}
                      {property.area && (
                        <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                          <Square className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{property.area}</div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">m²</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Descripción</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

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
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="text-amber-100 text-sm">Precio de venta</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-zinc-100">Contactar Agente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
                  >
                    <a 
                      href={property.phone ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(property.phone.replace(/\s+/g, ''))}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar Ahora
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <Link href="/contacto">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </Link>
                  </Button>
                  <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Agente: Luis Fernando</p>
                    <p className="mt-1">+57 321 422 3931</p>
                    <p className="text-xs mt-2 text-zinc-500 dark:text-zinc-500">Agente Certificado</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-zinc-100">Información Adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Referencia</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">#{id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Tipo</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{property.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Estado</span>
                    <Badge variant="secondary" className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 