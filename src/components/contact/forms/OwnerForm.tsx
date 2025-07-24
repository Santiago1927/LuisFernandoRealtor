import React from "react";
import { useOwnerFormLogic } from "@/hooks/useOwnerFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, User, AlertCircle } from "lucide-react";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_OWNER,
  INPUT_INFO,
} from "@/constants/constants";

interface OwnerFormProps {
  formSubmit: (data: any) => void;
  loading: boolean;
}

const OwnerForm: React.FC<OwnerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    onSubmit,
  } = useOwnerFormLogic({ formSubmit, loading });

  const renderField = (fieldKey: string, field: any) => {
    // Campos booleanos que deben usar checkbox
    const booleanFields = ['estudio', 'deposito', 'balcon', 'vigilancia', 'piscina'];
    
    if (booleanFields.includes(fieldKey)) {
      return (
        <div key={fieldKey} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldKey}
              {...register(fieldKey)}
              className={errors[fieldKey] ? 'border-red-500 dark:border-red-400' : ''}
            />
            <Label htmlFor={fieldKey} className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer">
              {field.label}
            </Label>
          </div>
          {errors[fieldKey] && (
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{String(errors[fieldKey]?.message)}</span>
            </div>
          )}
        </div>
      );
    }

    // Campos normales
    return (
      <div key={fieldKey} className="space-y-2">
        <Label htmlFor={fieldKey} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {field.label} *
        </Label>
        {errors[fieldKey] && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{String(errors[fieldKey]?.message)}</span>
          </div>
        )}
        <Input
          id={fieldKey}
          type={field.type}
          {...register(fieldKey)}
          className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
            errors[fieldKey] ? 'border-red-500 dark:border-red-400' : ''
          }`}
          placeholder={`Ingresa ${field.label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-amber-600" />
          <span>Solicitud de Venta</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre tu propiedad y te ayudaremos a venderla al mejor precio.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <User className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Información Personal
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
                <div key={fieldKey} className="space-y-2">
                  <Label htmlFor={fieldKey} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {field.label} *
                  </Label>
                  {errors[fieldKey] && (
                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{String(errors[fieldKey]?.message)}</span>
                    </div>
                  )}
                  <Input
                    id={fieldKey}
                    type={field.type}
                    {...register(fieldKey)}
                    className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                      errors[fieldKey] ? 'border-red-500 dark:border-red-400' : ''
                    }`}
                    placeholder={`Ingresa ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Información de la Propiedad
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ciudad" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Ciudad *
                </Label>
                {errors.ciudad && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.ciudad?.message)}</span>
                  </div>
                )}
                <Select onValueChange={(value) => register("ciudad").onChange({ target: { value } })}>
                  <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tipoPropiedad" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Tipo de Propiedad *
                </Label>
                {errors.tipoPropiedad && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.tipoPropiedad?.message)}</span>
                  </div>
                )}
                <Select onValueChange={(value) => register("tipoPropiedad").onChange({ target: { value } })}>
                  <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
                    <SelectValue placeholder="Selecciona tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {tipoPropiedad && PROPERTY_INFO_OWNER[tipoPropiedad] && (
              <div className="grid md:grid-cols-2 gap-6">
                {PROPERTY_INFO_OWNER[tipoPropiedad]?.map((fieldKey) => {
                  const field = INPUT_INFO[fieldKey];
                  return renderField(fieldKey, field);
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Preguntas Adicionales
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="valorAproximado" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Valor Aproximado *
                </Label>
                {errors.valorAproximado && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.valorAproximado?.message)}</span>
                  </div>
                )}
                <Input
                  id="valorAproximado"
                  type="text"
                  {...register("valorAproximado")}
                  className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                    errors.valorAproximado ? 'border-red-500 dark:border-red-400' : ''
                  }`}
                  placeholder="Ej: $500,000,000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valorAdministracion" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Valor Administración
                </Label>
                {errors.valorAdministracion && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.valorAdministracion?.message)}</span>
                  </div>
                )}
                <Input
                  id="valorAdministracion"
                  type="text"
                  {...register("valorAdministracion")}
                  className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                    errors.valorAdministracion ? 'border-red-500 dark:border-red-400' : ''
                  }`}
                  placeholder="Ej: $150,000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comentariosAdicionales" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Comentarios Adicionales
              </Label>
              {errors.comentariosAdicionales && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{String(errors.comentariosAdicionales?.message)}</span>
                </div>
              )}
              <Textarea
                id="comentariosAdicionales"
                {...register("comentariosAdicionales")}
                className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 min-h-[120px] ${
                  errors.comentariosAdicionales ? 'border-red-500 dark:border-red-400' : ''
                }`}
                placeholder="Cuéntanos más detalles sobre tu propiedad..."
              />
            </div>
          </div>
          
          {!isValid && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, complete todos los campos correctamente
              </AlertDescription>
            </Alert>
          )}
          
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-3 h-auto"
          >
            {loading ? (
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Building2 className="w-4 h-4 mr-2" />
            )}
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OwnerForm;
