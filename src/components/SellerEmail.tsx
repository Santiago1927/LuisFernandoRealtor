"use client";
import { useState } from "react";
import OwnerForm from "./forms/OwnerForm";

const SellerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ propertyType: "CASA", userType: "seller", ciudad: "Medellín"});

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setLoading(false);
  };

  return (
    <OwnerForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default SellerEmail;
