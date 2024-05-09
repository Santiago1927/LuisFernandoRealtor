import React from "react";
import { Field, FormData } from "@/types/forms.d";

const InputField: React.FC<{
  fieldKey: string;
  field: Field;
  formData: FormData;
  handleInputChange: (fieldKey: string, value: any) => void;
}> = ({ fieldKey, field, formData, handleInputChange }) => {
  switch (field.type) {
    case "select":
      return (
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
            {field.label}
          </label>
          <select
            className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
            value={formData[fieldKey] || ""}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "radio":
      return (
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
            {field.label}
          </label>
          <div className="flex">
            {field.options?.map((option) => (
              <label
                key={option.label}
                className="inline-flex items-center mr-4"
              >
                <input
                  type="radio"
                  className="form-radio"
                  name={fieldKey}
                  value={option.value}
                  checked={formData[fieldKey] === option.value}
                  onChange={() => handleInputChange(fieldKey, option.value)}
                />
                <span className="ml-2 text-secondary-900 dark:text-primary-200">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
            {field.label}
          </label>
          <input
            type={field.type}
            className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
            value={formData[fieldKey] || ""}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
          />
        </div>
      );
  }
};

export default InputField;
