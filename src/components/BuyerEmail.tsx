import { useState } from "react";
import BuyerForm from "./forms/BuyerForm";

const BuyerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data: any) => {
    console.log('dataB', data)
    setLoading(true);
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
  };

  return <BuyerForm formSubmit={formSubmit} />;
};

export default BuyerEmail;
