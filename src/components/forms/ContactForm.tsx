import React from "react";
import { useContactFormLogic } from "@/hooks/useContactFormLogic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, AlertCircle } from "lucide-react";

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
          
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Nombre *
            </Label>
            {errors.nombre && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.nombre.message}</span>
              </div>
            )}
            <Input
              id="nombre"
              type="text"
              {...register("nombre")}
              className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                errors.nombre ? 'border-red-500 dark:border-red-400' : ''
              }`}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Correo Electrónico *
            </Label>
            {errors.correo && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.correo.message}</span>
              </div>
            )}
            <Input
              id="correo"
              type="email"
              {...register("correo")}
              className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                errors.correo ? 'border-red-500 dark:border-red-400' : ''
              }`}
              placeholder="tu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Teléfono *
            </Label>
            {errors.telefono && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.telefono.message}</span>
              </div>
            )}
            <Input
              id="telefono"
              type="tel"
              {...register("telefono")}
              className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                errors.telefono ? 'border-red-500 dark:border-red-400' : ''
              }`}
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="asunto" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Asunto *
            </Label>
            {errors.asunto && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.asunto.message}</span>
              </div>
            )}
            <Input
              id="asunto"
              type="text"
              {...register("asunto")}
              className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
                errors.asunto ? 'border-red-500 dark:border-red-400' : ''
              }`}
              placeholder="Asunto de tu consulta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Mensaje *
            </Label>
            {errors.mensaje && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.mensaje.message}</span>
              </div>
            )}
            <Textarea
              id="mensaje"
              {...register("mensaje")}
              className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 min-h-[120px] ${
                errors.mensaje ? 'border-red-500 dark:border-red-400' : ''
              }`}
              placeholder="Cuéntanos en detalle tu consulta..."
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