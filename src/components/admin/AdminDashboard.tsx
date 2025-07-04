'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa React para usar JSX
import React from 'react';
// Importa el componente que muestra la lista de propiedades
import PropertyList from './PropertyList';
// Importa el formulario para crear/editar propiedades
import PropertyForm from './PropertyForm';
// Importa el hook personalizado para la lógica del dashboard de administrador
import { useAdminDashboardLogic } from '../../hooks/useAdminDashboardLogic';

// Componente principal del panel de administración
export default function AdminDashboard() {
  // Usa el hook para obtener los estados y handlers del dashboard
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
  } = useAdminDashboardLogic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header del panel de administración */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Panel de Administrador
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Gestiona las propiedades de tu sitio web
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Botón para ver el sitio web público */}
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Ver Sitio Web
              </button>
              {/* Botón para cerrar sesión */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Propiedades
          </h2>
          {/* Botón para crear una nueva propiedad */}
          <button
            onClick={handleCreateProperty}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Nueva Propiedad
          </button>
        </div>

        {/* Lista de propiedades con opciones de editar y eliminar */}
        <PropertyList
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />

        {/* Modal del formulario para crear o editar una propiedad */}
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