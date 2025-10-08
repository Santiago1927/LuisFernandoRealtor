"use client";

import { useState, useEffect } from "react";
import { usePaginatedProperties } from "../../../hooks/usePaginatedProperties";
import PropertyList from "../../../components/admin/PropertyList";
import PropertyForm from "../../../components/admin/PropertyForm";
import { useAdminAuthGuard } from "../../../hooks/useAdminAuthGuard";
import { useDeleteProperty } from "../../../hooks/usePropertyMutations";
import { useAlert } from "../../../components/layout/AlertContext";
import { Property } from "../../../types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  DollarSign,
  Building2,
  Home,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const tipos = [
  { value: "Casa", label: "Casa", icon: Home },
  { value: "Apartamento", label: "Apartamento", icon: Building2 },
  { value: "Casa Campestre", label: "Casa Campestre", icon: Home },
  { value: "Penthouse", label: "Penthouse", icon: Building2 },
  { value: "Lote", label: "Lote", icon: MapPin },
  { value: "Oficina", label: "Oficina", icon: Building2 },
  { value: "Local", label: "Local", icon: Building2 },
  { value: "Bodega", label: "Bodega", icon: Building2 },
];

const ciudades = ["Pasto", "Medellín", "Bogotá", "Cali"];

export default function AdminPropiedadesPage() {
  const { isAuthenticated, loading } = useAdminAuthGuard();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const deletePropertyMutation = useDeleteProperty();
  const { showAlert, showConfirm } = useAlert();

  const { data, isLoading, error } = usePaginatedProperties({
    page: currentPage,
    pageSize: 12,
    filters: {
      search,
      city,
      type,
      minPrice,
      maxPrice,
    },
  });

  // Mostrar loading del guard
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-600"></div>
      </div>
    );
  }

  // Si no está autenticado, el guard redirigirá
  if (!isAuthenticated) {
    return null;
  }

  const totalProperties = data?.total || 0;
  const totalPages = Math.ceil(totalProperties / 12);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDeleteProperty = async (id: string) => {
    showConfirm(
      "¿Estás seguro de que quieres eliminar esta propiedad?",
      async () => {
        try {
          await deletePropertyMutation.mutateAsync(id);
          showAlert("Propiedad eliminada exitosamente", "success");
        } catch (error) {
          console.error("Error al eliminar la propiedad:", error);
          showAlert(
            "Error al eliminar la propiedad. Intenta de nuevo.",
            "error"
          );
        }
      }
    );
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handlePropertySave = () => {
    handleFormClose();
  };

  const handleMinPriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setMinPrice(numericValue);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setMaxPrice(numericValue);
    setCurrentPage(1);
  };

  const formatPrice = (value: string) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-CO").format(parseInt(value));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                Error al cargar las propiedades
              </p>
              <Button onClick={() => window.location.reload()}>
                Intentar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Administración de Propiedades
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona y visualiza todas las propiedades disponibles
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProperty(null);
              setShowForm(true);
            }}
            className="bg-custom-600 hover:bg-custom-700 text-white"
          >
            + Nueva Propiedad
          </Button>
        </div>

        {/* Filtros de Búsqueda */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Búsqueda por texto */}
              <div className="lg:col-span-2">
                <Input
                  placeholder="Buscar propiedades..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </div>

              {/* Filtro de ciudad */}
              <div>
                <Select
                  value={city}
                  onValueChange={(value) => {
                    setCity(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ciudades</SelectItem>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de tipo */}
              <div>
                <Select
                  value={type}
                  onValueChange={(value) => {
                    setType(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {tipos.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        <div className="flex items-center gap-2">
                          <tipo.icon className="h-4 w-4" />
                          {tipo.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Precio mínimo */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Precio mín"
                  value={formatPrice(minPrice)}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Precio máximo */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Precio máx"
                  value={formatPrice(maxPrice)}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Botón para limpiar filtros */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                Limpiar Filtros
              </Button>

              <Badge variant="secondary" className="text-sm">
                Mostrando {Math.min(12, data?.properties?.length || 0)} de{" "}
                {totalProperties} propiedades
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contenido principal */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-custom-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Cargando propiedades...
              </p>
            </div>
          </div>
        ) : data?.properties && data.properties.length > 0 ? (
          <>
            <PropertyList
              properties={data.properties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Página {currentPage} de {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron propiedades
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ajusta los filtros o prueba con otros criterios de búsqueda
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Formulario de edición */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={handlePropertySave}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
