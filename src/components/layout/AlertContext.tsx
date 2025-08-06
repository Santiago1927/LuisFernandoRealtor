'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error' | 'info') => void;
  showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirm, setConfirm] = useState<{ 
    message: string; 
    onConfirm: () => void; 
    onCancel?: () => void; 
  } | null>(null);

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
    // Auto-hide alert after 4 seconds
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const showConfirm = (message: string, onConfirm: () => void, onCancel?: () => void) => {
    setConfirm({ message, onConfirm, onCancel });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const hideConfirm = () => {
    setConfirm(null);
  };

  const handleConfirm = () => {
    if (confirm) {
      confirm.onConfirm();
      hideConfirm();
    }
  };

  const handleCancel = () => {
    if (confirm) {
      confirm.onCancel?.();
      hideConfirm();
    }
  };

  const getAlertIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'info':
        return 'default';
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, hideAlert }}>
      {children}
      
      {/* Alert Modal */}
      {alert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
          <div className="w-full max-w-md">
            <Alert variant={getAlertVariant(alert.type)} className="border-2 shadow-2xl">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <AlertDescription className="flex-1 text-sm font-medium">
                  {alert.message}
                </AlertDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={hideAlert}
                  className="h-6 w-6 p-0 hover:bg-transparent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
            <div className="p-6">
              <div className="flex items-start space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Confirmar Acción
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {confirm.message}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-4 py-2"
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirm}
                  className="px-4 py-2"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
