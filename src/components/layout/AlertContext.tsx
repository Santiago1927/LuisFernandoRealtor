'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

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
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      
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
    </AlertContext.Provider>
  );
};

export default AlertProvider;
