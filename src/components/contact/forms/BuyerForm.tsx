import React from "react";
import { useBuyerFormLogic } from "@/hooks/useBuyerFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, User, AlertCircle } from "lucide-react";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
} from "@/constants/constants";

interface BuyerFormProps {
  formSubmit: (data: any) => void;
  loading: boolean;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    onSubmit,
  } = useBuyerFormLogic({ formSubmit, loading });

  const renderField = (fieldKey: string, field: any) => {
    // Campos booleanos que deben usar checkbox
    const booleanFields = ['deposito'];
    
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

    // Campo formaDePago que debe usar Select
    if (fieldKey === 'formaDePago') {
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
          <Select onValueChange={(value) => register(fieldKey).onChange({ target: { value } })}>
            <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
              <SelectValue placeholder="Selecciona forma de pago" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Home className="w-6 h-6 text-amber-600" />
          <span>Solicitud de Compra</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre la propiedad que estás buscando y te ayudaremos a encontrarla.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {PERSONAL_DATA.nombre.label} *
              </Label>
              {errors.nombre && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {String(errors.nombre?.message)}</span>
                </div>
              )}
              <Input
                id="nombre"
                type={PERSONAL_DATA.nombre.type}
                {...register("nombre")}
                className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                  errors.nombre ? 'border-red-500 dark:border-red-400' : ''
                }`}
                placeholder={`Ingresa ${PERSONAL_DATA.nombre.label.toLowerCase()}`}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {PERSONAL_DATA.correo.label} *
              </Label>
              {errors.correo && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {String(errors.correo?.message)}</span>
                </div>
              )}
              <Input
                id="correo"
                type={PERSONAL_DATA.correo.type}
                {...register("correo")}
                className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                  errors.correo ? 'border-red-500 dark:border-red-400' : ''
                }`}
                placeholder={`Ingresa ${PERSONAL_DATA.correo.label.toLowerCase()}`}
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {PERSONAL_DATA.telefono.label} *
              </Label>
              {errors.telefono && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {String(errors.telefono?.message)}</span>
                </div>
              )}
              <Input
                id="telefono"
                type={PERSONAL_DATA.telefono.type}
                {...register("telefono")}
                className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                  errors.telefono ? 'border-red-500 dark:border-red-400' : ''
                }`}
                placeholder={`Ingresa ${PERSONAL_DATA.telefono.label.toLowerCase()}`}
              />
            </div>
            
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
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
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
            
            <div className="space-y-2">
              <Label htmlFor="presupuesto" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Presupuesto (COP) *
              </Label>
              {errors.presupuesto && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{String(errors.presupuesto?.message)}</span>
                </div>
              )}
              <Input
                id="presupuesto"
                type="number"
                {...register("presupuesto")}
                className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                  errors.presupuesto ? 'border-red-500 dark:border-red-400' : ''
                }`}
                placeholder="Ingresa presupuesto (cop)"
              />
            </div>
          </div>
          
          {tipoPropiedad && PROPERTY_INFO_BUYER[tipoPropiedad] && (
            <div className="grid md:grid-cols-2 gap-6">
              {PROPERTY_INFO_BUYER[tipoPropiedad]?.map((fieldKey) => {
                const field = INPUT_INFO[fieldKey];
                return renderField(fieldKey, field);
              })}
            </div>
          )}
          
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
              placeholder="Cuéntanos más detalles sobre lo que buscas..."
            />
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
              <User className="w-4 h-4 mr-2" />
            )}
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BuyerForm;
