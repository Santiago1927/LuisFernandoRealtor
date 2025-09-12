"use client";

import React from "react";
import PropertyList from "./PropertyList";
import PropertyForm from "./PropertyForm";
import { useAdminDashboardLogic } from "../../hooks/useAdminDashboardLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Plus,
  LogOut,
  Globe,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboard() {
  const {
    properties,
    showForm,
    editingProperty,
    handleLogout,
    handleCreateProperty,
    handleEditProperty,
    handleDeleteProperty,
    handleFormClose,
    handlePropertySave,
    router,
    page,
    setPage,
    totalPages,
    showVerMas,
    isLoading,
  } = useAdminDashboardLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 text-center">
                  Panel de Administrador
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-center">
                  Gestiona las propiedades de tu sitio web
                </p>
              </div>
            </div>

            {/* Top-right buttons removed: 'Ver Sitio Web' and 'Cerrar Sesión' are handled in the sidebar */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2 justify-center">
                  <Building2 className="w-6 h-6 text-amber-600" />
                  <span>Propiedades</span>
                </CardTitle>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-center">
                  Administra el catálogo de propiedades disponibles
                </p>
              </div>
              {/* 'Nueva Propiedad' button removed from header card; use sidebar button instead */}
            </div>
          </CardHeader>
        </Card>

        {isLoading ? (
          <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Cargando propiedades...
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <PropertyList
              properties={properties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />

            {totalPages > 1 && (
              <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur mt-8">
                <CardContent className="py-6">
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from(
                        { length: Math.min(totalPages, 7) },
                        (_, i) => {
                          const pageNumber = i + 1;
                          const isActive = page === pageNumber;

                          return (
                            <Button
                              key={pageNumber}
                              variant={isActive ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPage(pageNumber)}
                              className={
                                isActive
                                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                                  : "border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                              }
                            >
                              {pageNumber}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {showVerMas && (
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      >
                        Ver más propiedades
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}

        {showForm && (
          <PropertyForm
            property={editingProperty}
            onSave={handlePropertySave}
            onClose={handleFormClose}
          />
        )}
      </div>
    </div>
  );
}
