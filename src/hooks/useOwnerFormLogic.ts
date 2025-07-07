import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/validations/ownerSchema";
import { FormData, OwnerFormProps, PropertyType, City, LegalSituation } from "@/types/forms.d";

/**
 * Interfaz que define las propiedades del hook useOwnerFormLogic
 * @param formSubmit - Función que se ejecuta al enviar el formulario con los datos validados
 * @param loading - Estado de carga que indica si el formulario está siendo procesado
 */
interface UseOwnerFormLogicProps {
  formSubmit: (data: FormData) => void;
  loading: boolean;
}

/**
 * Hook personalizado que maneja toda la lógica del formulario de propietarios
 * Incluye validación con Zod, manejo de estado del formulario y configuración de valores por defecto
 * @param formSubmit - Función callback para procesar los datos del formulario
 * @param loading - Estado de carga del formulario
 * @returns Objeto con todas las funciones y estados necesarios para el formulario
 */
export const useOwnerFormLogic = ({ formSubmit, loading }: UseOwnerFormLogicProps) => {
  // Configuración del formulario con react-hook-form y validación Zod
  const {
    register,        // Función para registrar campos en el formulario
    handleSubmit,    // Función que maneja el envío del formulario
    watch,           // Función para observar cambios en campos específicos
    formState: { errors, isValid }, // Estado del formulario con errores y validez
  } = useForm<FormData>({
    resolver: zodResolver(ownerSchema), // Resolver de validación usando Zod
    defaultValues: {
      ciudad: City.Medellin,                    // Ciudad por defecto: Medellín
      tipoPropiedad: PropertyType.Casa,         // Tipo de propiedad por defecto: Casa
      situacionJuridica: LegalSituation.ListaParaEscriturar, // Situación jurídica por defecto
    },
  });

  // Observar cambios en campos específicos para renderizado condicional
  const tipoPropiedad = watch("tipoPropiedad");       // Tipo de propiedad seleccionado
  const situacionJuridica = watch("situacionJuridica"); // Situación jurídica seleccionada

  /**
   * Función que se ejecuta cuando el formulario es enviado
   * @param data - Datos del formulario validados por Zod
   */
  const onSubmit = (data: FormData) => {
    formSubmit(data);
  };

  // Retornar todas las funciones y estados necesarios para el componente
  return {
    register,            // Función para registrar campos
    handleSubmit,        // Función para manejar envío
    errors,              // Errores de validación
    isValid,             // Estado de validez del formulario
    tipoPropiedad,       // Tipo de propiedad seleccionado (para renderizado condicional)
    situacionJuridica,   // Situación jurídica seleccionada (para campos adicionales)
    onSubmit,            // Función de envío personalizada
    loading,             // Estado de carga
  };
}; 