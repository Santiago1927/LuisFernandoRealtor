'use client'; // Indica que este archivo se ejecuta del lado del cliente en Next.js

// Importa React para poder usar JSX y componentes funcionales
import React from 'react';
// Importa el tipo Property para tipar las propiedades que se gestionan en el formulario
import { Property } from '../../types/property';
// Importa el hook personalizado que maneja la lógica y el estado del formulario de propiedad
import { usePropertyFormLogic } from '../../hooks/usePropertyFormLogic';

// Interfaz que define las props que recibe el formulario de propiedad
interface PropertyFormProps {
  property?: Property | null; // Propiedad a editar (opcional)
  onSave: (property: Property) => void; // Función que se ejecuta al guardar la propiedad
  onClose: () => void; // Función que se ejecuta al cerrar el formulario
}

// Componente principal del formulario para crear o editar una propiedad
export default function PropertyForm({ property, onSave, onClose }: PropertyFormProps) {
  // Hook personalizado que maneja el estado y lógica del formulario
  const {
    formData, // Estado con los datos del formulario
    images, // Archivos de imágenes seleccionados
    videos, // Archivos de videos seleccionados
    uploading, // Estado de carga al guardar
    imageUrls, // URLs de imágenes ya subidas
    videoUrls, // URLs de videos ya subidos
    mapAddress, // Dirección para geocodificación
    setMapAddress, // Setter para la dirección
    lat, // Latitud geocodificada
    lng, // Longitud geocodificada
    handleInputChange, // Handler para cambios en los inputs
    handleImageChange, // Handler para selección de imágenes
    handleVideoChange, // Handler para selección de videos
    handleSubmit, // Handler para el envío del formulario
    onClose: handleClose, // Handler para cerrar el formulario
  } = usePropertyFormLogic({ property, onSave, onClose });

  return (
    // Modal de fondo oscuro para el formulario
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Contenedor principal del formulario */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Encabezado con título y botón de cerrar */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
            </h2>
            {/* Botón para cerrar el formulario */}
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Formulario de la propiedad */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección de información básica de la propiedad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo para el título de la propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Campo para la dirección y mapa de la propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="address"
                  value={mapAddress}
                  onChange={e => { setMapAddress(e.target.value); handleInputChange(e); }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {/* Muestra el mapa si hay latitud y longitud geocodificadas */}
                {lat && lng && (
                  <div className="mt-2 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
                    ></iframe>
                  </div>
                )}
              </div>

              {/* Campo para la ciudad de la propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ciudad
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Seleccionar ciudad</option>
                  <option value="Medellin">Medellín</option>
                  <option value="Bogota">Bogotá</option>
                  <option value="Cali">Cali</option>
                  <option value="Pasto">Pasto</option>
                </select>
              </div>

              {/* Campo para el precio de la propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Campo para el tipo de propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Propiedad
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="house">Casa</option>
                  <option value="apartment">Apartamento</option>
                  <option value="commercial">Comercial</option>
                  <option value="land">Terreno</option>
                </select>
              </div>

              {/* Campo para el estado de la propiedad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="available">Disponible</option>
                  <option value="sold">Vendida</option>
                  <option value="rented">Alquilada</option>
                </select>
              </div>

              {/* Campo para habitaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habitaciones
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Campo para baños */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Baños
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Campo para área */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Área (m²)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Campo para la descripción de la propiedad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Sección para subir imágenes y videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input para imágenes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Imágenes
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {/* Muestra la cantidad de imágenes actuales */}
                {imageUrls.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Imágenes actuales: {imageUrls.length}</p>
                  </div>
                )}
              </div>

              {/* Input para videos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Videos
                </label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {/* Muestra la cantidad de videos actuales */}
                {videoUrls.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Videos actuales: {videoUrls.length}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones del formulario: cancelar y guardar */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Guardando...' : (property ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
