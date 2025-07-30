'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Eye } from "lucide-react";
import { PropertyFormData } from '../../types/property';

interface FormDebugPanelProps {
  formData: PropertyFormData;
  title?: string;
}

export default function FormDebugPanel({ formData, title = "Form Debug" }: FormDebugPanelProps) {
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="mb-4 border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200 text-sm">
          <Code className="w-4 h-4" />
          <span>{title}</span>
          <Badge variant="secondary" className="text-xs">
            Development Only
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Datos Básicos:</p>
            <div className="space-y-1">
              <div><span className="text-zinc-500">Título:</span> <span className="font-mono">{formData.title || '(vacío)'}</span></div>
              <div><span className="text-zinc-500">Tipo:</span> <Badge variant="outline" className="text-xs">{formData.type}</Badge></div>
              <div><span className="text-zinc-500">Ciudad:</span> <span className="font-mono">{formData.city || '(vacío)'}</span></div>
              <div><span className="text-zinc-500">Estado:</span> <Badge variant="outline" className="text-xs">{formData.status}</Badge></div>
            </div>
          </div>
          
          <div>
            <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Detalles:</p>
            <div className="space-y-1">
              <div><span className="text-zinc-500">Precio:</span> <span className="font-mono">${formData.price?.toLocaleString() || '0'}</span></div>
              <div><span className="text-zinc-500">Habitaciones:</span> <span className="font-mono">{formData.bedrooms || 0}</span></div>
              <div><span className="text-zinc-500">Baños:</span> <span className="font-mono">{formData.bathrooms || 0}</span></div>
              <div><span className="text-zinc-500">Área:</span> <span className="font-mono">{formData.area || 0} m²</span></div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
          <p className="font-medium text-blue-700 dark:text-blue-300 mb-1 text-xs">Dirección:</p>
          <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {formData.address || '(vacío)'}
          </p>
        </div>

        <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
          <details className="text-xs">
            <summary className="font-medium text-blue-700 dark:text-blue-300 cursor-pointer hover:text-blue-600">
              Ver JSON completo
            </summary>
            <pre className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </details>
        </div>

        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Eye className="w-3 h-3 inline mr-1" />
          Este panel se actualiza en tiempo real cuando cambias los valores del formulario.
        </div>
      </CardContent>
    </Card>
  );
} 