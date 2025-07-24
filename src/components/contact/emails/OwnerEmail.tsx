import { useState } from "react";
import OwnerForm from "../forms/OwnerForm";
import { useAlert } from "@/components/layout/AlertContext";
import { ownerService } from "../../../../firebase/firestoreService";

const OwnerEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const formSubmit = async (data: any) => {
    setLoading(true);
    try {
      const ownerData = {
        ...data,
        userType: "owner",
        firstQuestion: data.firstQuestion || false,
        secondQuestion: data.secondQuestion || false,
        direccion: data.direccion || "",
        edadPropiedad: data.edadPropiedad || null,
        areaConstruida: data.areaConstruida || null,
        terraza: data.terraza || null,
        patio: data.patio || null,
        habitaciones: data.habitaciones || null,
        baños: data.baños || null,
        piso: data.piso || null,
        parqueaderos: data.parqueaderos || null,
        estudio: data.estudio || false,
        deposito: data.deposito || false,
        balcon: data.balcon || false,
        vigilancia: data.vigilancia || false,
        piscina: data.piscina || false,
        valorAdministracion: data.valorAdministracion || null,
        valorAproximado: data.valorAproximado || null,
        area: data.area || null,
        situacionJuridica: data.situacionJuridica || "",
        situacionJuridicaEspecifica: data.situacionJuridicaEspecifica || "",
        tipoProyecto: data.tipoProyecto || null,
        comentariosAdicionales: data.comentariosAdicionales || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await ownerService.createOwner(ownerData);

      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(ownerData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        showAlert("Mensaje Enviado !", "success");
      } else {
        showAlert("Error al enviar el mensaje", "error");
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert("Error al enviar el mensaje", "error");
    } finally {
      setLoading(false);
    }
  };

  return <OwnerForm formSubmit={formSubmit} loading={loading} />;
};

export default OwnerEmail;
