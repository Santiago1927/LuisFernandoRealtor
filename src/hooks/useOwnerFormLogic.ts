import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerSchema } from "@/validations/ownerSchema";
import { FormData, OwnerFormProps, PropertyType, City, LegalSituation } from "@/types/forms.d";

interface UseOwnerFormLogicProps {
  formSubmit: (data: FormData) => void;
  loading: boolean;
}

export const useOwnerFormLogic = ({ formSubmit, loading }: UseOwnerFormLogicProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      ciudad: City.Medellin,
      tipoPropiedad: PropertyType.Casa,
      situacionJuridica: LegalSituation.ListaParaEscriturar,
    },
  });

  const tipoPropiedad = watch("tipoPropiedad");
  const situacionJuridica = watch("situacionJuridica");

  const onSubmit = (data: FormData) => {
    formSubmit(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    tipoPropiedad,
    situacionJuridica,
    onSubmit,
    loading,
  };
}; 