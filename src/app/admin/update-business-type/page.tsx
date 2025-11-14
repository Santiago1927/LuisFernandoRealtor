"use client";

import { useState } from "react";
import { useAuthContext } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

export default function UpdateBusinessTypePage() {
  const { isAuthenticated, user } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error" | "partial";
    message: string;
    details?: string[];
  }>({ status: "idle", message: "" });

  const updateBusinessTypes = async () => {
    setIsUpdating(true);
    setResult({ status: "idle", message: "Procesando..." });

    try {
      const propertiesRef = collection(db, "properties");
      const snapshot = await getDocs(propertiesRef);

      if (snapshot.empty) {
        setResult({
          status: "error",
          message: "No se encontraron propiedades en la base de datos",
        });
        setIsUpdating(false);
        return;
      }

      const updates: Array<{
        id: string;
        title: string;
        oldValue: string;
        newValue: string;
      }> = [];

      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const currentBusinessType = data.business_type;

        let newBusinessType = currentBusinessType;
        let needsUpdate = false;

        if (currentBusinessType === "Vender") {
          newBusinessType = "Venta";
          needsUpdate = true;
        } else if (currentBusinessType === "Permutar") {
          newBusinessType = "Permuta";
          needsUpdate = true;
        }

        if (needsUpdate) {
          updates.push({
            id: docSnapshot.id,
            title: data.title || docSnapshot.id,
            oldValue: currentBusinessType,
            newValue: newBusinessType,
          });
        }
      });

      if (updates.length === 0) {
        setResult({
          status: "success",
          message: "✅ No hay propiedades que necesiten actualización",
        });
        setIsUpdating(false);
        return;
      }

      // Actualizar en lotes de 500 (límite de Firestore)
      const batchSize = 500;
      const details: string[] = [];

      for (let i = 0; i < updates.length; i += batchSize) {
        const batch = writeBatch(db);
        const batchUpdates = updates.slice(i, i + batchSize);

        batchUpdates.forEach((update) => {
          const docRef = doc(db, "properties", update.id);
          batch.update(docRef, { business_type: update.newValue });
          details.push(
            `${update.title}: "${update.oldValue}" → "${update.newValue}"`
          );
        });

        await batch.commit();
      }

      setResult({
        status: "success",
        message: `✅ ¡Actualización completada! ${updates.length} propiedades actualizadas`,
        details,
      });
    } catch (error) {
      console.error("Error durante la actualización:", error);
      setResult({
        status: "error",
        message: `❌ Error: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-red-600 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Acceso Restringido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Debes estar autenticado como administrador para acceder a esta
              página.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Actualizar Tipo de Negocio
            </CardTitle>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Este script actualizará todas las propiedades que tengan:
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
              <li>"Vender" → "Venta"</li>
              <li>"Permutar" → "Permuta"</li>
            </ul>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Advertencia:</strong> Esta acción actualizará todas las
                propiedades en la base de datos. Asegúrate de estar seguro antes
                de continuar.
              </AlertDescription>
            </Alert>

            <Button
              onClick={updateBusinessTypes}
              disabled={isUpdating}
              className="w-full"
              size="lg"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Ejecutar Actualización
                </>
              )}
            </Button>

            {result.status !== "idle" && (
              <Alert
                variant={
                  result.status === "success" ? "default" : "destructive"
                }
              >
                {result.status === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  <p className="font-semibold">{result.message}</p>
                  {result.details && result.details.length > 0 && (
                    <div className="mt-3 max-h-96 overflow-y-auto">
                      <p className="text-sm font-medium mb-2">
                        Propiedades actualizadas:
                      </p>
                      <ul className="text-xs space-y-1">
                        {result.details.map((detail, index) => (
                          <li
                            key={index}
                            className="text-zinc-600 dark:text-zinc-400"
                          >
                            {index + 1}. {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
