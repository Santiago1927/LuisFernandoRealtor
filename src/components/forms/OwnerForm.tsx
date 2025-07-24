import React from "react";
import {
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_OWNER,
  PERSONAL_DATA,
  QUESTIONS,
  INPUT_INFO,
} from "@/constants/constants";
import { OwnerFormProps } from "@/types/forms.d";
import InputField from "./InputField";
import { useOwnerFormLogic } from "@/hooks/useOwnerFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, User, AlertCircle, Loader2 } from "lucide-react";

const OwnerForm: React.FC<OwnerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    situacionJuridica,
    onSubmit,
  } = useOwnerFormLogic({ formSubmit, loading });

  return (
    <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-amber-600" />
          <span>Formulario de Propietario</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre tu propiedad para ofrecerte el mejor servicio de venta o alquiler.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-amber-600" />
                <span>Información Personal</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(PERSONAL_DATA).map(([fieldKey, field]) => (
                  <InputField
                    key={fieldKey}
                    fieldKey={fieldKey}
                    field={field}
                    register={register}
                    errors={errors}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span>Información de la Propiedad</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  fieldKey="ciudad"
                  field={{
                    id: "ciudad",
                    type: "select",
                    label: "Ciudad",
                    options: CITY_OPTIONS,
                  }}
                  register={register}
                  errors={errors}
                />
                
                <InputField
                  fieldKey="tipoPropiedad"
                  field={{
                    id: "tipoPropiedad",
                    type: "select",
                    label: "Tipo de Propiedad",
                    options: PROPERTY_TYPE_OPTIONS,
                  }}
                  register={register}
                  errors={errors}
                />
              </div>

              {tipoPropiedad && PROPERTY_INFO_OWNER[tipoPropiedad] && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {PROPERTY_INFO_OWNER[tipoPropiedad].map((fieldKey) => (
                    <InputField
                      key={fieldKey}
                      fieldKey={fieldKey}
                      field={INPUT_INFO[fieldKey]}
                      register={register}
                      errors={errors}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Preguntas Adicionales
              </h3>
              <div className="space-y-6">
                {Object.entries(QUESTIONS).map(([fieldKey, field]) => (
                  <InputField
                    key={fieldKey}
                    fieldKey={fieldKey}
                    field={field}
                    register={register}
                    errors={errors}
                  />
                ))}
              </div>
            </div>

            {situacionJuridica === "OTRA" && (
              <div>
                <InputField
                  fieldKey="situacionJuridicaEspecifica"
                  field={{
                    id: "situacionJuridicaEspecifica",
                    type: "text",
                    label: "Especifique la Situación Jurídica",
                  }}
                  register={register}
                  errors={errors}
                />
              </div>
            )}

            <div>
              <InputField
                fieldKey="comentariosAdicionales"
                field={{
                  id: "comentariosAdicionales",
                  type: "text",
                  label: "Comentarios Adicionales",
                }}
                register={register}
                errors={errors}
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
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
