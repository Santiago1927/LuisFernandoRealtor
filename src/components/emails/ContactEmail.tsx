import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  area?: string;
  areaConstruida?: string;
  balcon?: boolean;
  baños?: string;
  comentariosAdicionales?: string;
  correo: string;
  ciudad?: string;
  deposito?: boolean;
  detalleSituacionJuridica?: string;
  direccion?: string;
  edadPropiedad?: string;
  estudio?: boolean;
  formaDePago?: string;
  habitaciones?: string;
  nombre: string;
  one?: boolean;
  parqueaderos?: string;
  patio?: string;
  piscina?: boolean;
  piso?: string;
  presupuesto?: string;
  tipoPropiedad?: string;
  situacionJuridica?: string;
  telefono: string;
  terraza?: string;
  two?: boolean;
  userType: string;
  valorAdministracion?: string;
  valorAproximado?: string;
  vigilancia?: boolean;
  asunto?: string;
  mensaje?: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
  area,
  areaConstruida,
  balcon,
  baños,
  comentariosAdicionales,
  correo,
  ciudad,
  deposito,
  detalleSituacionJuridica,
  direccion,
  edadPropiedad,
  estudio,
  formaDePago,
  habitaciones,
  nombre,
  parqueaderos,
  patio,
  piscina,
  piso,
  presupuesto,
  tipoPropiedad,
  situacionJuridica,
  telefono,
  terraza,
  userType,
  valorAdministracion,
  valorAproximado,
  vigilancia,
  asunto,
  mensaje,
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        {userType === "contact" 
          ? "Nuevo mensaje de contacto"
          : "Nueva consulta de propiedad"
        }
      </Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans my-auto mx-auto max-w-[465px]">
          <Container className="mx-auto p-4 bg-white shadow-md rounded-lg">
            <Section className="border-t border-gray-200">
              <Row className="py-4">
                <Column>
                  <Text className="text-center font-semibold text-2xl mb-2">
                    Hola Luis Fernando,
                  </Text>
                  <Text className="text-center font-medium text-lg">
                    {userType === "contact" 
                      ? "Has recibido un nuevo mensaje de contacto desde tu sitio web!"
                      : "Has recibido una nueva consulta de propiedad desde tu sitio web!"
                    }
                  </Text>
                </Column>
              </Row>
              {userType === "buyer" ? (
                <Row className="py-2">
                  <Column>
                    <Text className="text-base">
                      <b>Nombre:</b> {nombre ? nombre : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Correo Electrónico:</b> {correo ? correo : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Teléfono:</b> {telefono ? telefono : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Ciudad:</b> {ciudad ? ciudad : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Tipo de Propiedad:</b>{" "}
                      {tipoPropiedad
                        ? tipoPropiedad
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")
                        : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Area:</b> {area ? area : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Habitaciones:</b> {habitaciones ? habitaciones : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Baños:</b> {baños ? baños : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Parqueaderos:</b> {parqueaderos ? parqueaderos : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Deposito:</b> {deposito ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Forma de Pago:</b> {formaDePago ? formaDePago : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Presupuesto:</b> {presupuesto ? presupuesto : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Comentarios Adicionales:</b> {comentariosAdicionales}
                    </Text>
                  </Column>
                </Row>
              ) : userType === "owner" ? (
                <Row className="py-2">
                  <Column>
                    <Text className="text-base">
                      <b>Nombre:</b> {nombre ? nombre : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Correo Electrónico:</b> {correo ? correo : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Teléfono:</b> {telefono ? telefono : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Ciudad:</b> {ciudad ? ciudad : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Tipo de Propiedad:</b>{" "}
                      {tipoPropiedad
                        ? tipoPropiedad
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")
                        : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Dirección:</b> {direccion ? direccion : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Edad Propiedad:</b>{" "}
                      {edadPropiedad ? edadPropiedad : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Área:</b> {area ? area : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Área Construida:</b> {areaConstruida}
                    </Text>
                    <Text className="text-base">
                      <b>Terraza:</b> {terraza ? terraza : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Patio:</b> {patio ? patio : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Habitaciones:</b> {habitaciones ? habitaciones : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Baños:</b> {baños ? baños : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Parqueaderos:</b> {parqueaderos ? parqueaderos : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Piso:</b> {piso ? piso : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Estudio:</b> {estudio ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Deposito:</b> {deposito ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Balcon:</b> {balcon ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Vigilancia:</b> {vigilancia ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Piscina:</b> {piscina ? "Sí" : "No"}
                    </Text>
                    <Text className="text-base">
                      <b>Valor Administración:</b>{" "}
                      {valorAdministracion ? valorAdministracion : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Valor Aproximado:</b>{" "}
                      {valorAproximado ? valorAproximado : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Situación Jurídica:</b>{" "}
                      {situacionJuridica
                        ? situacionJuridica
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")
                        : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Detalle Situación Jurídica:</b>{" "}
                      {detalleSituacionJuridica
                        ? detalleSituacionJuridica
                        : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Comentarios Adicionales:</b>{" "}
                      {comentariosAdicionales ? comentariosAdicionales : "N/A"}
                    </Text>
                  </Column>
                </Row>
              ) : (
                <Row className="py-2">
                  <Column>
                    <Text className="text-base">
                      <b>Nombre:</b> {nombre ? nombre : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Correo Electrónico:</b> {correo ? correo : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Teléfono:</b> {telefono ? telefono : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Asunto:</b> {asunto ? asunto : "N/A"}
                    </Text>
                    <Text className="text-base">
                      <b>Mensaje:</b> {mensaje ? mensaje : "N/A"}
                    </Text>
                  </Column>
                </Row>
              )}
            </Section>
            <Text className="text-center text-xs text-gray-600 py-4">
              © 2024 | Luis Fernando Realtor | Colombia |
              www.luisfernandorealtor.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
