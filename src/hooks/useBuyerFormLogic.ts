import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/validations/buyerSchema";
import { FormData, BuyerFormProps, PropertyType, City } from "@/types/forms.d";

interface UseBuyerFormLogicProps {
  formSubmit: (data: FormData) => void;
  loading: boolean;
}

export const useBuyerFormLogic = ({
  formSubmit,
  loading,
}: UseBuyerFormLogicProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      ciudad: City.Medellin,
      tipoPropiedad: PropertyType.Casa,
      deposito: false,
      area: undefined,
      habitaciones: undefined,
      baños: undefined,
      parqueaderos: undefined,
      formaDePago: undefined,
      presupuesto: "",
      comentariosAdicionales: "",
    },
  });

  const tipoPropiedad = watch("tipoPropiedad");

  const onSubmit = (data: FormData) => {
    formSubmit(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    onSubmit,
    loading,
    setValue,
    watch,
  };
};
