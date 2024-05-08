import React, { useState } from "react";
import {
  propertyTypeOptions,
  cityOptions,
  additionalFields,
  inputFields,
  personalFields,
  questions,
} from "./formConfig";

const SellerFormFields = () => {
  const [formData, setFormData] = useState<any>({ propertyType: "CASA" });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderPersonalInput = (fieldKey: string) => {
    const field = personalFields[fieldKey];
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
  };

  const renderQuestions = (fieldKey: string) => {
    const field = questions[fieldKey];
    return (
      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
          {field.label}
        </label>
        <div className="flex">
          {field.options?.map((option) => (
            <label key={option.label} className="inline-flex items-center mr-4">
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
  };

  const renderInput = (fieldKey: string) => {
    const field = inputFields[fieldKey];
    switch (field.type) {
      case "number":
      case "text":
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
            {fieldKey === "situacionJuridica" &&
              formData[fieldKey] === "OTRA" && (
                <input
                  type="text"
                  placeholder="Especifique la situación jurídica"
                  className="mt-2 block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
                  value={formData["detalleSituacionJuridica"] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "detalleSituacionJuridica",
                      e.target.value
                    )
                  }
                />
              )}
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
        return null;
    }
  };

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(questions).map((field) => renderQuestions(field))}
        {Object.keys(personalFields).map((field) => renderPersonalInput(field))}

        <div>
          <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
            Ciudad
          </label>
          <select
            className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          >
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-secondary-900 dark:text-primary-200">
            Tipo de Propiedad
          </label>
          <select
            className="block w-full px-4 py-3 text-secondary-900 placeholder-secondary-700 bg-gray-50 border border-secondary-700 rounded-lg shadow-sm dark:bg-secondary-800 dark:border-primary-600 dark:text-primary-50 dark:placeholder-primary-200"
            value={formData.propertyType || ""}
            onChange={(e) => handleInputChange("propertyType", e.target.value)}
          >
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {additionalFields[
          formData.propertyType as keyof typeof additionalFields
        ] &&
          additionalFields[
            formData.propertyType as keyof typeof additionalFields
          ].map((field) => renderInput(field))}
      </div>
      <button
        type="submit"
        className="w-full py-3 px-5 text-sm font-medium text-secondary-900 bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700 shadow-lg transform transition-transform duration-200 hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default SellerFormFields;
