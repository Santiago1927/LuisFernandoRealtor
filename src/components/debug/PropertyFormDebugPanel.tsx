"use client";

import React, { useState } from "react";
import { Property } from "../../types/property";
import PropertyForm from "../admin/PropertyForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Edit, X } from "lucide-react";
import { useAuthContext } from "../auth/AuthContext";

export default function PropertyFormDebugPanel() {
  const [showForm, setShowForm] = useState(false);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const { isAuthenticated } = useAuthContext();

  const handleSave = (property: Property) => {
    if (editProperty) {
      // Actualizar propiedad existente
      setSavedProperties((prev) =>
        prev.map((p) => (p.id === property.id ? property : p))
      );
    } else {
      // Agregar nueva propiedad
      setSavedProperties((prev) => [...prev, property]);
    }
    setShowForm(false);
    setEditProperty(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditProperty(null);
  };

  const handleEdit = (property: Property) => {
    setEditProperty(property);
    setShowForm(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🧪 Panel de Pruebas - Formulario de Propiedades</span>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-custom-600 to-custom-600 hover:from-custom-700 hover:to-custom-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Propiedad
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <Card
                  key={property.id}
                  className="border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">
                          {property.title}
                        </h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          {property.address}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {property.type}
                          </Badge>
                          {property.conjunto_cerrado && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            >
                              Conjunto
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProperty(property)}
                          title="Ver detalles completos"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(property)}
                          title="Editar propiedad"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {/* Precio principal */}
                    <div className="text-lg font-bold text-custom-600">
                      {formatCurrency(property.price)}
                    </div>

                    {/* Información básica */}
                    <div className="space-y-2">
                      {/* Referencia - Solo para administradores */}
                      {isAuthenticated && property.id && (
                        <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                          🔗 #{property.id}
                        </div>
                      )}

                      {/* Ciudad */}
                      {property.city && (
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          📍 {property.city}
                        </div>
                      )}

                      {/* Teléfono */}
                      {property.phone && (
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          📞 {property.phone}
                        </div>
                      )}

                      {/* Características básicas */}
                      {(property.bedrooms ||
                        property.bathrooms ||
                        property.area) && (
                        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                          {property.bedrooms && property.bedrooms > 0 && (
                            <span>🛏️ {property.bedrooms} hab</span>
                          )}
                          {property.bathrooms && property.bathrooms > 0 && (
                            <span>🚿 {property.bathrooms} baños</span>
                          )}
                          {property.area && property.area > 0 && (
                            <span>📐 {property.area}m²</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Valor de administración */}
                    {property.valor_administracion &&
                      property.valor_administracion > 0 && (
                        <div className="text-xs p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <div className="font-medium text-blue-800 dark:text-blue-200">
                            Administración:
                          </div>
                          <div className="text-blue-700 dark:text-blue-300">
                            {formatCurrency(property.valor_administracion)}/mes
                          </div>
                        </div>
                      )}

                    {/* Zonas comunes */}
                    {property.zonas_comunes &&
                      property.zonas_comunes.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            🏊‍♂️ Zonas comunes:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {property.zonas_comunes
                              .slice(0, 4)
                              .map((zona, index) => (
                                <Badge
                                  key={`debug-zona-${index}-${zona}`}
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                >
                                  {zona}
                                </Badge>
                              ))}
                            {property.zonas_comunes.length > 4 && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              >
                                +{property.zonas_comunes.length - 4} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Formas de pago */}
                    {property.formas_de_pago &&
                      property.formas_de_pago.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            💳 Formas de pago:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {property.formas_de_pago.map((forma, index) => (
                              <Badge
                                key={`debug-forma-${index}-${forma}`}
                                variant="outline"
                                className="text-xs border-custom-300 text-custom-700 dark:border-custom-600 dark:text-custom-300"
                              >
                                {forma}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Campos específicos según tipo */}
                    {property.type === "Lote" &&
                      (property.lote_frente || property.lote_fondo) && (
                        <div className="text-xs p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                          <div className="font-medium text-purple-800 dark:text-purple-200">
                            📏 Dimensiones del lote:
                          </div>
                          <div className="text-purple-700 dark:text-purple-300">
                            {property.lote_frente &&
                              `Frente: ${property.lote_frente}m`}
                            {property.lote_frente &&
                              property.lote_fondo &&
                              " × "}
                            {property.lote_fondo &&
                              `Fondo: ${property.lote_fondo}m`}
                          </div>
                        </div>
                      )}

                    {/* Número de pisos */}
                    {property.numero_pisos && (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        🏢 {property.numero_pisos} piso
                        {property.numero_pisos > 1 ? "s" : ""}
                      </div>
                    )}

                    {/* Edad de la propiedad */}
                    {property.edad_propiedad && (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        🗓️ Edad: {property.edad_propiedad}
                      </div>
                    )}

                    {/* Área construida */}
                    {property.area_construida &&
                      property.area_construida.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            🏗️ Área construida:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {property.area_construida
                              .slice(0, 3)
                              .map((area, index) => (
                                <Badge
                                  key={`debug-area-${index}-${area}`}
                                  variant="secondary"
                                  className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                >
                                  {area}
                                </Badge>
                              ))}
                            {property.area_construida.length > 3 && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              >
                                +{property.area_construida.length - 3} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Información de permutas */}
                    {property.tipo_permuta && (
                      <div className="text-xs p-2 bg-custom-50 dark:bg-custom-900/20 rounded border border-custom-200 dark:border-custom-800">
                        <div className="font-medium text-custom-800 dark:text-custom-200">
                          🔄 Acepta permuta:
                        </div>
                        <div className="text-custom-700 dark:text-custom-300">
                          {property.tipo_permuta}
                          {property.permuta_porcentaje &&
                            ` - ${property.permuta_porcentaje}%`}
                        </div>
                        {property.permuta_monto_max && (
                          <div className="text-custom-700 dark:text-custom-300">
                            Hasta: {formatCurrency(property.permuta_monto_max)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Descripción */}
                    {property.description && (
                      <div className="text-xs p-2 bg-gray-50 dark:bg-gray-800/50 rounded border">
                        <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                          📝 Descripción:
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-ellipsis overflow-hidden max-h-12">
                          {property.description}
                        </div>
                      </div>
                    )}

                    {/* Estado de la propiedad */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <Badge
                        variant={
                          property.status === "available"
                            ? "default"
                            : property.status === "sold"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {property.status === "available"
                          ? "✅ Disponible"
                          : property.status === "sold"
                          ? "❌ Vendida"
                          : "🏠 Alquilada"}
                      </Badge>

                      {/* Imágenes y videos */}
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {property.images && property.images.length > 0 && (
                          <span>📸 {property.images.length}</span>
                        )}
                        {property.videos && property.videos.length > 0 && (
                          <span>🎥 {property.videos.length}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {savedProperties.length === 0 && (
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No hay propiedades guardadas aún.</p>
                <p className="text-sm">
                  Crea una nueva propiedad para probar el formulario.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <PropertyForm
          property={editProperty}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

      {/* Modal de detalles completos */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white/95 dark:bg-zinc-900/95">
            <CardHeader className="border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedProperty.title}
                  </CardTitle>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {selectedProperty.address}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProperty(null)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Referencia - Solo para administradores */}
              {isAuthenticated && selectedProperty.id && (
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    🔗 Referencia de la Propiedad
                  </h3>
                  <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    #{selectedProperty.id}
                  </div>
                </div>
              )}

              {/* Información básica */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    💰 Información Financiera
                  </h3>
                  <div className="text-2xl font-bold text-custom-600">
                    {formatCurrency(selectedProperty.price)}
                  </div>
                  {selectedProperty.valor_administracion &&
                    selectedProperty.valor_administracion > 0 && (
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        <strong>Administración:</strong>{" "}
                        {formatCurrency(selectedProperty.valor_administracion)}
                        /mes
                      </div>
                    )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    📋 Información General
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Tipo:</strong> {selectedProperty.type}
                    </div>
                    {selectedProperty.city && (
                      <div>
                        <strong>Ciudad:</strong> {selectedProperty.city}
                      </div>
                    )}
                    {selectedProperty.phone && (
                      <div>
                        <strong>Teléfono:</strong> {selectedProperty.phone}
                      </div>
                    )}
                    <div>
                      <strong>Estado:</strong>
                      <Badge
                        className="ml-2"
                        variant={
                          selectedProperty.status === "available"
                            ? "default"
                            : selectedProperty.status === "sold"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {selectedProperty.status === "available"
                          ? "Disponible"
                          : selectedProperty.status === "sold"
                          ? "Vendida"
                          : "Alquilada"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Características */}
              {(selectedProperty.bedrooms ||
                selectedProperty.bathrooms ||
                selectedProperty.area) && (
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    🏠 Características
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {selectedProperty.bedrooms &&
                      selectedProperty.bedrooms > 0 && (
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded">
                          <div className="text-2xl">🛏️</div>
                          <div className="text-sm font-medium">
                            {selectedProperty.bedrooms}
                          </div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400">
                            Habitaciones
                          </div>
                        </div>
                      )}
                    {selectedProperty.bathrooms &&
                      selectedProperty.bathrooms > 0 && (
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded">
                          <div className="text-2xl">🚿</div>
                          <div className="text-sm font-medium">
                            {selectedProperty.bathrooms}
                          </div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400">
                            Baños
                          </div>
                        </div>
                      )}
                    {selectedProperty.area && selectedProperty.area > 0 && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded">
                        <div className="text-2xl">📐</div>
                        <div className="text-sm font-medium">
                          {selectedProperty.area}m²
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          Área
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Campos específicos */}
              {selectedProperty.numero_pisos && (
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    🏢 Detalles de Construcción
                  </h3>
                  <div className="text-sm">
                    <strong>Número de pisos:</strong>{" "}
                    {selectedProperty.numero_pisos}
                  </div>
                </div>
              )}

              {selectedProperty.type === "Lote" &&
                (selectedProperty.lote_frente ||
                  selectedProperty.lote_fondo) && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      📏 Dimensiones del Lote
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedProperty.lote_frente && (
                        <div>
                          <strong>Frente:</strong>{" "}
                          {selectedProperty.lote_frente}m
                        </div>
                      )}
                      {selectedProperty.lote_fondo && (
                        <div>
                          <strong>Fondo:</strong> {selectedProperty.lote_fondo}m
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {selectedProperty.edad_propiedad && (
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    🗓️ Antigüedad
                  </h3>
                  <div className="text-sm">
                    {selectedProperty.edad_propiedad}
                  </div>
                </div>
              )}

              {/* Área construida */}
              {selectedProperty.area_construida &&
                selectedProperty.area_construida.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      🏗️ Área Construida (
                      {selectedProperty.area_construida.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.area_construida.map((area, index) => (
                        <Badge
                          key={`selected-area-${index}-${area}`}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {/* Zonas comunes */}
              {selectedProperty.zonas_comunes &&
                selectedProperty.zonas_comunes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      🏊‍♂️ Zonas Comunes ({selectedProperty.zonas_comunes.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.zonas_comunes.map((zona, index) => (
                        <Badge
                          key={`selected-zona-${index}-${zona}`}
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          {zona}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {/* Formas de pago */}
              {selectedProperty.formas_de_pago &&
                selectedProperty.formas_de_pago.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      💳 Formas de Pago
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.formas_de_pago.map((forma, index) => (
                        <Badge
                          key={`selected-forma-${index}-${forma}`}
                          variant="outline"
                          className="border-custom-300 text-custom-700 dark:border-custom-600 dark:text-custom-300"
                        >
                          {forma}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {/* Información de permutas */}
              {selectedProperty.tipo_permuta && (
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    🔄 Acepta Permutas
                  </h3>
                  <div className="p-4 bg-custom-50 dark:bg-custom-900/20 rounded border border-custom-200 dark:border-custom-800">
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Tipo:</strong> {selectedProperty.tipo_permuta}
                      </div>
                      {selectedProperty.permuta_porcentaje && (
                        <div>
                          <strong>Porcentaje que cubre:</strong>{" "}
                          {selectedProperty.permuta_porcentaje}%
                        </div>
                      )}
                      {selectedProperty.permuta_monto_max && (
                        <div>
                          <strong>Monto máximo:</strong>{" "}
                          {formatCurrency(selectedProperty.permuta_monto_max)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Descripción */}
              {selectedProperty.description && (
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    📝 Descripción
                  </h3>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 p-3 bg-zinc-50 dark:bg-zinc-800 rounded">
                    {selectedProperty.description}
                  </div>
                </div>
              )}

              {/* Multimedia */}
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  🎬 Multimedia
                </h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📸</span>
                    <span>{selectedProperty.images?.length || 0} imágenes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎥</span>
                    <span>{selectedProperty.videos?.length || 0} videos</span>
                  </div>
                </div>
              </div>

              {/* Información técnica */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  ℹ️ Información Técnica
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                  <div>
                    <strong>ID:</strong> {selectedProperty.id}
                  </div>
                  <div>
                    <strong>Conjunto cerrado:</strong>{" "}
                    {selectedProperty.conjunto_cerrado ? "Sí" : "No"}
                  </div>
                  <div>
                    <strong>Creado:</strong>{" "}
                    {selectedProperty.createdAt?.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Actualizado:</strong>{" "}
                    {selectedProperty.updatedAt?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
