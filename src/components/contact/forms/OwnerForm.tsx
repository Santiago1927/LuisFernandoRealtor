import React from "react";
import { Controller } from "react-hook-form";
import { useOwnerFormLogic } from "@/hooks/useOwnerFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, User, Home, AlertCircle } from "lucide-react";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_OWNER,
  INPUT_INFO,
  QUESTIONS,
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
    setValue,
    watch,
    control,
  } = useOwnerFormLogic({ formSubmit, loading });

  const renderField = (fieldKey: string, field: any) => {
    const booleanFields = ["estudio", "deposito", "piscina"];
    const radioFields = ["firstQuestion", "secondQuestion"];
    const checkboxFields = [
      "tieneParqueadero",
      "tieneTerraza",
      "tienePatio",
      "balcon",
      "tieneAdministracion",
    ];

    if (booleanFields.includes(fieldKey)) {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Controller
              name={fieldKey}
              control={control}
              defaultValue={false}
              render={({ field: controllerField }) => (
                <Checkbox
                  id={`boolean-${fieldKey}`}
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                  className={
                    errors[fieldKey] ? "border-red-500 dark:border-red-400" : ""
                  }
                />
              )}
            />
            <Label
              htmlFor={`boolean-${fieldKey}`}
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
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

    if (radioFields.includes(fieldKey)) {
      return (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {field.label} *
          </Label>
          {errors[fieldKey] && (
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{String(errors[fieldKey]?.message)}</span>
            </div>
          )}
          <div className="space-y-2">
            {field.options?.map((option: any) => (
              <div
                key={`radio-${fieldKey}-${option.value}`}
                className="flex items-center space-x-2"
              >
                <Controller
                  name={fieldKey}
                  control={control}
                  defaultValue={undefined}
                  render={({ field: controllerField }) => (
                    <input
                      type="radio"
                      id={`radio-${fieldKey}-${option.value}`}
                      checked={controllerField.value === option.value}
                      onChange={() => controllerField.onChange(option.value)}
                      className={`w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                        errors[fieldKey]
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}
                    />
                  )}
                />
                <Label
                  htmlFor={`radio-${fieldKey}-${option.value}`}
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (checkboxFields.includes(fieldKey)) {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Controller
              name={fieldKey}
              control={control}
              defaultValue={false}
              render={({ field: controllerField }) => (
                <Checkbox
                  id={`check-${fieldKey}`}
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                  className={
                    errors[fieldKey] ? "border-red-500 dark:border-red-400" : ""
                  }
                />
              )}
            />
            <Label
              htmlFor={`check-${fieldKey}`}
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
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

    return (
      <div className="space-y-2">
        <Label
          htmlFor={fieldKey}
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
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
            errors[fieldKey] ? "border-red-500 dark:border-red-400" : ""
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
          <span>Solicitud de venta</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre tu propiedad y te ayudaremos a venderla al mejor
          precio.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Preguntas iniciales
              </h3>
            </div>
            <div className="space-y-6">
              {Object.entries(QUESTIONS).map(([fieldKey, field]) => (
                <div key={`question-${fieldKey}`}>
                  {renderField(fieldKey, field)}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <User className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Información personal
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
                <div key={`personal-${fieldKey}`} className="space-y-2">
                  <Label
                    htmlFor={`personal-input-${fieldKey}`}
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    {field.label} *
                  </Label>
                  {errors[fieldKey] && (
                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{String(errors[fieldKey]?.message)}</span>
                    </div>
                  )}
                  <Input
                    id={`personal-input-${fieldKey}`}
                    type={field.type}
                    {...register(fieldKey)}
                    className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                      errors[fieldKey]
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                    placeholder={`Ingresa ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <Home className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Información de la propiedad
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="ciudad-select"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Ciudad
                </Label>
                {errors.ciudad && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.ciudad?.message)}</span>
                  </div>
                )}
                <Select
                  onValueChange={(value) => setValue("ciudad", value as any)}
                  value={watch("ciudad")}
                  {...register("ciudad")}
                >
                  <SelectTrigger
                    id="ciudad-select"
                    className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                  >
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITY_OPTIONS.map((option) => (
                      <SelectItem
                        key={`city-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="tipo-propiedad-select"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Tipo de propiedad
                </Label>
                {errors.tipoPropiedad && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.tipoPropiedad?.message)}</span>
                  </div>
                )}
                <Select
                  onValueChange={(value) =>
                    setValue("tipoPropiedad", value as any)
                  }
                  value={watch("tipoPropiedad")}
                  {...register("tipoPropiedad")}
                >
                  <SelectTrigger
                    id="tipo-propiedad-select"
                    className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
                  >
                    <SelectValue placeholder="Selecciona tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <SelectItem
                        key={`property-type-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {tipoPropiedad && PROPERTY_INFO_OWNER[tipoPropiedad] && (
              <div className="grid md:grid-cols-2 gap-6">
                {PROPERTY_INFO_OWNER[tipoPropiedad].map((fieldKey, index) => {
                  const field = INPUT_INFO[fieldKey];
                  if (!field) return null;
                  return (
                    <div key={`property-field-${fieldKey}-${index}`}>
                      {renderField(fieldKey, field)}
                    </div>
                  );
                })}
              </div>
            )}

            {watch("tieneParqueadero") === true && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="numeroParqueaderos"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Número de parqueaderos
                    </Label>
                    {errors.numeroParqueaderos && (
                      <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          {String(errors.numeroParqueaderos?.message)}
                        </span>
                      </div>
                    )}
                    <Input
                      id="numeroParqueaderos"
                      type="number"
                      min="1"
                      {...register("numeroParqueaderos")}
                      className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                        errors.numeroParqueaderos
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}
                      placeholder="Ej: 1, 2, 3..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="areaParqueadero"
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      Área del Parqueadero (m²)
                    </Label>
                    {errors.areaParqueadero && (
                      <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{String(errors.areaParqueadero?.message)}</span>
                      </div>
                    )}
                    <Input
                      id="areaParqueadero"
                      type="number"
                      {...register("areaParqueadero")}
                      className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                        errors.areaParqueadero
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}
                      placeholder="Ingresa el área total"
                    />
                  </div>
                </div>
              </div>
            )}

            {watch("tieneTerraza") === true && (
              <div className="space-y-2">
                <Label
                  htmlFor="areaTerraza"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Área de la terraza (m²)
                </Label>
                {errors.areaTerraza && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.areaTerraza?.message)}</span>
                  </div>
                )}
                <Input
                  id="areaTerraza"
                  type="number"
                  {...register("areaTerraza")}
                  className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                    errors.areaTerraza
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  placeholder="Ingresa el área de la terraza"
                />
              </div>
            )}

            {watch("tienePatio") === true && (
              <div className="space-y-2">
                <Label
                  htmlFor="areaPatio"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Área del patio (m²)
                </Label>
                {errors.areaPatio && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.areaPatio?.message)}</span>
                  </div>
                )}
                <Input
                  id="areaPatio"
                  type="number"
                  {...register("areaPatio")}
                  className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                    errors.areaPatio ? "border-red-500 dark:border-red-400" : ""
                  }`}
                  placeholder="Ingresa el área del patio"
                />
              </div>
            )}

            {watch("tieneAdministracion") === true && (
              <div className="space-y-2">
                <Label
                  htmlFor="valorAdministracion"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Valor administración (COP)
                </Label>
                {errors.valorAdministracion && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{String(errors.valorAdministracion?.message)}</span>
                  </div>
                )}
                <Input
                  id="valorAdministracion"
                  type="number"
                  {...register("valorAdministracion")}
                  className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                    errors.valorAdministracion
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  placeholder="Ingresa el valor de administración"
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Preguntas adicionales
              </h3>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="comentariosAdicionales"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Comentarios adicionales
              </Label>
              <textarea
                id="comentariosAdicionales"
                {...register("comentariosAdicionales")}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 focus:border-amber-500 dark:focus:border-amber-400 min-h-[100px] resize-none"
                placeholder="Comentarios adicionales sobre tu propiedad..."
              />
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-3 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Building2 className="w-4 h-4 mr-2" />
            )}
            {loading ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OwnerForm;
