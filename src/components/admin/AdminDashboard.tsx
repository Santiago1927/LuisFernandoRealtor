'use client';

import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import { useAdminDashboardLogic } from '../../hooks/useAdminDashboardLogic';

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
  } = useAdminDashboardLogic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
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
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Ver Sitio Web
              </button>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Propiedades
          </h2>
          <button
            onClick={handleCreateProperty}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Nueva Propiedad
          </button>
        </div>

        {/* Property List */}
        <PropertyList
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />

        {/* Property Form Modal */}
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