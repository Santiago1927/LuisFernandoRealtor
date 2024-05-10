'use client'
import Alert from '@/components/assets/Alert';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error' | 'info') => void;
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

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div onClick={hideAlert} className="fixed inset-0 z-40 bg-black bg-opacity-25"> {/* Agregamos un overlay para cerrar haciendo clic fuera */}
          <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
