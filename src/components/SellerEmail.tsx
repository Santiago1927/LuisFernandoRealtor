"use client";
import { useState } from "react";
import SellerFormFields from "./forms/SellerFormFileds";

const SellerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({ propertyType: "CASA" });

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
    <SellerFormFields
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default SellerEmail;
