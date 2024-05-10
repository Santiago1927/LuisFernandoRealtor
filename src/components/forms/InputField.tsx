import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Field } from "@/types/forms.d";

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
  return (
    <div className="mb-2">
      <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
        {field.label}
      </label>
      {errors && errors[fieldKey] && errors[fieldKey].message && (
        <span className="text-red-500">{errors[fieldKey].message}</span>
      )}
      {field.type === "select" ? (
        <select
          {...register(fieldKey)}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "radio" ? (
        <div className="flex">
          {field.options?.map((option) => (
            <label key={option.label} className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
                value={option.value}
                {...register(fieldKey)}
              />

              <span className="ml-2 text-secondary-900 dark:text-primary-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          {...register(fieldKey)}
          className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
        />
      )}
    </div>
  );
};

export default InputField;
