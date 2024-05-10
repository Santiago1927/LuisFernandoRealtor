"use client";
import { useState } from "react";
import OwnerForm from "./forms/OwnerForm";

const OwnerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data: any) => {
    setLoading(true);
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
  };

  return <OwnerForm formSubmit={formSubmit} />;
};

export default OwnerEmail;
