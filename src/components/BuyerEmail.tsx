import { useState } from "react";
import BuyerForm from "./forms/BuyerForm";

const BuyerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({propertyType: 'CASA', userType: 'buyer', ciudad: 'Medellín'});

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
    <BuyerForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default BuyerEmail;
