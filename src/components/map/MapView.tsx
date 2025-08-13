"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ClientMap = dynamic(() => import('./ClientLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent mx-auto mb-2" />
        <div className="text-gray-600 dark:text-gray-400">Cargando mapa...</div>
      </div>
    </div>
  ),
});

export default ClientMap; 