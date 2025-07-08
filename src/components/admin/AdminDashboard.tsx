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
    <div className="min-h-screen bg-gradient-to-b from-gray-50/80 to-gray-100 dark:from-secondary-800/80 dark:to-secondary-900 flex flex-col items-center">
      {/* Header del panel de administración */}
      <div className="bg-gray-50 dark:bg-secondary-800 shadow-sm border-b border-gray-200 dark:border-gray-700 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-10">
            <div>
              <h1 className="text-4xl font-extrabold text-yellow-500 mb-2">
                Panel de Administrador
              </h1>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-300 font-light">
                Gestiona las propiedades de tu sitio web
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Botón para ver el sitio web público */}
              <button
                onClick={() => router.push('/')}
                className="px-5 py-2.5 text-base bg-secondary-700 text-white rounded-xl hover:bg-secondary-900 transition-shadow shadow-md hover:shadow-lg"
              >
                Ver Sitio Web
              </button>
              {/* Botón para cerrar sesión */}
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 text-base bg-red-600 text-white rounded-xl hover:bg-red-700 transition-shadow shadow-md hover:shadow-lg"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6 md:gap-0">
          <h2 className="text-3xl font-bold text-yellow-500 mb-0">
            Propiedades
          </h2>
          {/* Botón para crear una nueva propiedad */}
          <button
            onClick={handleCreateProperty}
            className="px-7 py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-shadow shadow-md hover:shadow-lg font-bold text-lg"
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