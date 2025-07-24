import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Field } from "@/types/forms.d";
import { useInputFieldLogic } from "../../hooks/useInputFieldLogic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";

interface InputFieldProps {
  fieldKey: string;
  field: Field;
  register: UseFormRegister<any>;
  errors?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  fieldKey,
  field,
  register,
  errors,
}) => {
  const {
    hasError,
    errorMessage,
    isSelectField,
    isRadioField,
    isInputField,
  } = useInputFieldLogic({ fieldKey, field, register, errors });

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={fieldKey}
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {field.label} *
      </Label>
      
      {hasError && (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}
      
      {isSelectField ? (
        <Select>
          <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400">
            <SelectValue placeholder={`Selecciona ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : isRadioField ? (
        <RadioGroup className="flex flex-wrap gap-4">
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${fieldKey}-${option.value}`} />
              <Label 
                htmlFor={`${fieldKey}-${option.value}`}
                className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Input
          id={fieldKey}
          type={field.type}
          {...register(fieldKey)}
          className={`w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400 ${
            hasError ? 'border-red-500 dark:border-red-400' : ''
          }`}
          placeholder={`Ingresa ${field.label.toLowerCase()}`}
        />
      )}
    </div>
  );
};

export default InputField;
