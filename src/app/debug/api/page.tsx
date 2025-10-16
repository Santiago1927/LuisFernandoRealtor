/**
 * Página de debug para probar APIs de propiedades
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DebugAPI() {
  const [featuredResult, setFeaturedResult] = useState<any>(null);
  const [generalResult, setGeneralResult] = useState<any>(null);
  const [createResult, setCreateResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFeaturedAPI = async () => {
    setLoading(true);
    try {
      console.log("🔍 Probando API de propiedades destacadas...");
      const response = await fetch("/api/propiedades/featured");
      const data = await response.json();
      console.log("✅ Resultado destacadas:", data);
      setFeaturedResult(data);
    } catch (error) {
      console.error("❌ Error destacadas:", error);
      setFeaturedResult({
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
    setLoading(false);
  };

  const testGeneralAPI = async () => {
    setLoading(true);
    try {
      console.log("🔍 Probando API de propiedades generales...");
      const response = await fetch("/api/propiedades/general");
      const data = await response.json();
      console.log("✅ Resultado generales:", data);
      setGeneralResult(data);
    } catch (error) {
      console.error("❌ Error generales:", error);
      setGeneralResult({
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
    setLoading(false);
  };

  const createTestProperty = async () => {
    setLoading(true);
    try {
      console.log("🔧 Creando propiedad de prueba...");
      const response = await fetch("/api/debug/create-test-property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("✅ Resultado creación:", data);
      setCreateResult(data);
    } catch (error) {
      console.error("❌ Error creación:", error);
      setCreateResult({
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Debug APIs de Propiedades</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Crear Propiedad de Prueba */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Crear Propiedad de Prueba
          </h2>
          <Button
            onClick={createTestProperty}
            disabled={loading}
            className="mb-4"
          >
            Crear Propiedad No Destacada
          </Button>

          {createResult && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(createResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Test API Destacadas */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            API Propiedades Destacadas
          </h2>
          <Button onClick={testFeaturedAPI} disabled={loading} className="mb-4">
            Probar /api/propiedades/featured
          </Button>

          {featuredResult && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(featuredResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Test API Generales */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            API Propiedades Generales
          </h2>
          <Button onClick={testGeneralAPI} disabled={loading} className="mb-4">
            Probar /api/propiedades/general
          </Button>

          {generalResult && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(generalResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
