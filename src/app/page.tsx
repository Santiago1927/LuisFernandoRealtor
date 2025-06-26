'use client';
import CarouselSection from "@/components/CarouselSection";
import MainSection from "../components/MainSection";
import PropertyList from "../components/admin/PropertyList";
import { useEffect, useState } from "react";
import { Property } from "../types/property";
import { propertyService } from "../../firebase/firestoreService";
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const unsubscribe = propertyService.subscribeToProperties((properties) => {
      setProperties(properties);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800">
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      <MainSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Propiedades Destacadas</h2>
        <PropertyList properties={properties} />
      </div>
      <CarouselSection />
    </div>
  );
}
