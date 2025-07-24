import React from "react";
import InputField from "./InputField";
import { BuyerFormProps } from "@/types/forms.d";
import {
  PERSONAL_DATA,
  CITY_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_INFO_BUYER,
  INPUT_INFO,
} from "@/constants/constants";
import Loader from "../assets/Loader";
import { useBuyerFormLogic } from "@/hooks/useBuyerFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home, User, AlertCircle } from "lucide-react";

const BuyerForm: React.FC<BuyerFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    onSubmit,
  } = useBuyerFormLogic({ formSubmit, loading });

  return (
    <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
          <Home className="w-6 h-6 text-amber-600" />
          <span>Formulario de Comprador</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre tus preferencias para encontrar la propiedad perfecta.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          
          {tipoPropiedad && PROPERTY_INFO_BUYER[tipoPropiedad] && (
            <div className="grid md:grid-cols-2 gap-6">
              {PROPERTY_INFO_BUYER[tipoPropiedad]?.map((fieldKey) => (
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
            <User className="w-4 h-4 mr-2" />
            Enviar Solicitud
            <Loader loading={loading} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BuyerForm;
