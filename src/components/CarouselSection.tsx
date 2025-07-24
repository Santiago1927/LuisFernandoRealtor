"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square } from "lucide-react";

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const properties = [
    {
      id: 1,
      image: "/images/photos/carousel1.webp",
      title: "Villa de Lujo en El Poblado",
      location: "Medellín, Antioquia",
      price: "$2,500,000 USD",
      beds: 5,
      baths: 4,
      sqft: "8,500",
      status: "Disponible"
    },
    {
      id: 2,
      image: "/images/photos/carousel2.webp",
      title: "Penthouse Exclusivo",
      location: "Bogotá, Cundinamarca",
      price: "$1,800,000 USD",
      beds: 4,
      baths: 3,
      sqft: "6,200",
      status: "Reservado"
    },
    {
      id: 3,
      image: "/images/photos/carousel3.webp",
      title: "Casa Colonial Restaurada",
      location: "Cali, Valle del Cauca",
      price: "$1,200,000 USD",
      beds: 6,
      baths: 5,
      sqft: "9,800",
      status: "Disponible"
    },
    {
      id: 4,
      image: "/images/photos/carousel4.webp",
      title: "Apartamento de Diseño",
      location: "Pasto, Nariño",
      price: "$850,000 USD",
      beds: 3,
      baths: 2,
      sqft: "4,500",
      status: "Disponible"
    },
    {
      id: 5,
      image: "/images/photos/carousel5.webp",
      title: "Finca de Recreo",
      location: "Rionegro, Antioquia",
      price: "$3,200,000 USD",
      beds: 7,
      baths: 6,
      sqft: "12,000",
      status: "Disponible"
    },
    {
      id: 6,
      image: "/images/photos/carousel6.webp",
      title: "Casa Moderna Minimalista",
      location: "Envigado, Antioquia",
      price: "$1,500,000 USD",
      beds: 4,
      baths: 3,
      sqft: "5,800",
      status: "Reservado"
    }
  ];

  const goToPrevSlide = () => {
    setActiveIndex(activeIndex === 0 ? properties.length - 1 : activeIndex - 1);
  };

  const goToNextSlide = () => {
    setActiveIndex(activeIndex === properties.length - 1 ? 0 : activeIndex + 1);
  };

  const currentProperty = properties[activeIndex];

  return (
    <section className="relative w-full bg-gradient-to-br from-zinc-50 via-white to-amber-50/20 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            Propiedades Destacadas
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Propiedades de
            <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Lujo Exclusivo
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Descubre nuestra colección de propiedades premium en las mejores ubicaciones de Colombia
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          
          <div className="relative aspect-[16/10] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              fill
              src={currentProperty.image}
              alt={currentProperty.title}
              className="object-cover transition-all duration-700 ease-in-out"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <Card className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant={currentProperty.status === "Disponible" ? "default" : "secondary"} 
                               className={currentProperty.status === "Disponible" 
                                 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                                 : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}>
                          {currentProperty.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {currentProperty.title}
                      </h3>
                      
                      <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{currentProperty.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>{currentProperty.beds}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>{currentProperty.baths}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="w-4 h-4" />
                          <span>{currentProperty.sqft} ft²</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl lg:text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {currentProperty.price}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/30"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            <span className="sr-only">Anterior</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            <span className="sr-only">Siguiente</span>
          </Button>

          <div className="flex justify-center space-x-2 mt-6">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-amber-600 dark:bg-amber-400 w-8"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
              >
                <span className="sr-only">Slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Ver Todas las Propiedades
          </Button>
        </div>
      </div>
    </section>
  );
}
