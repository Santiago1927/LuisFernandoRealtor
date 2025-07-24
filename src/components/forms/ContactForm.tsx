import React from "react";
import InputField from "./InputField";
import { useContactFormLogic } from "@/hooks/useContactFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  formSubmit: (data: any) => void;
  loading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ formSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    contactFields,
    onSubmit,
  } = useContactFormLogic({ formSubmit, loading });

  return (
    <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
          <Send className="w-6 h-6 text-amber-600" />
          <span>Contacto General</span>
        </CardTitle>
        <p className="text-zinc-600 dark:text-zinc-400">
          Envíanos tu consulta y te responderemos en el menor tiempo posible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {contactFields.map(({ fieldKey, field }) => (
            <InputField
              key={fieldKey}
              fieldKey={fieldKey}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
          
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
              <Send className="w-4 h-4 mr-2" />
            )}
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm; 