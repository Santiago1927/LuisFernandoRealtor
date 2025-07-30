'use client';

import { useState, useEffect } from 'react';
import { propertyService } from '../../../firebase/firestoreService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Database,
  Loader2
} from "lucide-react";

interface FirebaseStatus {
  connected: boolean;
  propertiesCount: number;
  typeCounts: { [key: string]: number };
  error?: string;
  loading: boolean;
}

export default function FirebaseDebugPanel() {
  const [status, setStatus] = useState<FirebaseStatus>({
    connected: false,
    propertiesCount: 0,
    typeCounts: {},
    loading: true
  });

  const testConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: undefined }));
    
    try {
      console.log('🔍 Testing Firebase connection...');
      const properties = await propertyService.getAllProperties();
      
      // Contar tipos
      const typeCounts: { [key: string]: number } = {};
      properties.forEach(property => {
        const type = property.type || 'Sin tipo';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
      
      setStatus({
        connected: true,
        propertiesCount: properties.length,
        typeCounts,
        loading: false
      });
      
      console.log('✅ Firebase connected successfully!', { 
        count: properties.length, 
        types: typeCounts 
      });
      
    } catch (error: any) {
      console.error('❌ Firebase connection failed:', error);
      setStatus({
        connected: false,
        propertiesCount: 0,
        typeCounts: {},
        error: error.message || 'Unknown error',
        loading: false
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="mb-6 border-2 border-dashed border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
            <Database className="w-5 h-5" />
            <span>Estado de Firebase - Debug</span>
          </CardTitle>
          <Button 
            onClick={testConnection} 
            disabled={status.loading}
            variant="outline"
            size="sm"
          >
            {status.loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Probar Conexión'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Estado de Conexión */}
          <div className="flex items-center space-x-2">
            {status.loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            ) : status.connected ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">
              {status.loading ? 'Conectando...' : 
               status.connected ? 'Conectado a Firebase' : 
               'Error de conexión'}
            </span>
          </div>

          {/* Conteo de Propiedades */}
          {status.connected && (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>Total de propiedades:</strong> {status.propertiesCount}
              </p>
            </div>
          )}

          {/* Tipos de Propiedades */}
          {status.connected && Object.keys(status.typeCounts).length > 0 && (
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Tipos de propiedades encontrados:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(status.typeCounts).map(([type, count]) => (
                  <Badge 
                    key={type} 
                    variant="secondary"
                    className="text-xs"
                  >
                    {type || 'Sin tipo'}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {status.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error de Firebase:
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                    {status.error}
                  </p>
                  {status.error.includes('permission') && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                      💡 Necesitas aplicar las reglas de Firebase Console. 
                      Ver archivo: firebase-rules-instructions.md
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instrucciones */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 border-t pt-3">
            <p><strong>Debug:</strong> Este panel se oculta automáticamente en producción.</p>
            <p><strong>Esperado:</strong> 19 propiedades con tipos &quot;Casa&quot; y &quot;Apartamento&quot;</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 