'use client';

import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";

const PropertyFormDebugPanel = dynamic(() => import('../../../components/debug/PropertyFormDebugPanel'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-600"></div>
  </div>
});

export default function PropertyFormDebugPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Admin
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            🧪 Panel de Pruebas - Formulario de Propiedades
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Prueba todos los nuevos campos del formulario de propiedades con validaciones y comportamiento condicional.
          </p>
        </div>
        
        <PropertyFormDebugPanel />
      </div>
    </div>
  );
}
