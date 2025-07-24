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
  correo: string;
  nombre: string;
  telefono: string;
  userType: string;
  area?: string;
  areaConstruida?: string;
  balcon?: boolean;
  baños?: string;
  comentariosAdicionales?: string;
  ciudad?: string;
  deposito?: boolean;
  detalleSituacionJuridica?: string;
  direccion?: string;
  edadPropiedad?: string;
  estudio?: boolean;
  formaDePago?: string;
  habitaciones?: string;
  one?: boolean;
  parqueaderos?: string;
  patio?: string;
  piscina?: boolean;
  piso?: string;
  presupuesto?: string;
  tipoPropiedad?: string;
  situacionJuridica?: string;
  terraza?: string;
  two?: boolean;
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
        <Body className="bg-gradient-to-br from-zinc-50 to-amber-50 font-sans my-auto mx-auto max-w-[600px]">
          
          <Container className="mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-zinc-200">
            
            <Section className="border-t-4 border-amber-500 pt-6">
              
              <Row className="py-6">
                <Column>
                  <Text className="text-center font-bold text-3xl mb-3 text-zinc-900">
                    Hola Luis Fernando,
                  </Text>
                  
                  <Text className="text-center font-semibold text-xl text-zinc-700 mb-6">
                    {userType === "contact" 
                      ? "Has recibido un nuevo mensaje de contacto desde tu sitio web!"
                      : "Has recibido una nueva consulta de propiedad desde tu sitio web!"
                    }
                  </Text>
                </Column>
              </Row>

              {userType === "buyer" ? (
                <Row className="py-4">
                  <Column>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                      <Text className="text-lg font-bold text-amber-800 mb-4 border-b border-amber-300 pb-2">
                        📋 Información del Comprador
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Nombre:</span> 
                          <span className="ml-2 text-zinc-700">{nombre || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Correo Electrónico:</span> 
                          <span className="ml-2 text-blue-600">{correo || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Teléfono:</span> 
                          <span className="ml-2 text-zinc-700">{telefono || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Ciudad:</span> 
                          <span className="ml-2 text-zinc-700">{ciudad || "N/A"}</span>
                        </Text>
                      </div>
                      
                      <Text className="text-lg font-bold text-amber-800 mt-6 mb-4 border-b border-amber-300 pb-2">
                        🏠 Preferencias de Propiedad
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Tipo de Propiedad:</span> 
                          <span className="ml-2 text-zinc-700">
                            {tipoPropiedad
                              ? tipoPropiedad
                                  .split("_")
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                  .join(" ")
                              : "N/A"}
                          </span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Área:</span> 
                          <span className="ml-2 text-zinc-700">{area || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Habitaciones:</span> 
                          <span className="ml-2 text-zinc-700">{habitaciones || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Baños:</span> 
                          <span className="ml-2 text-zinc-700">{baños || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Parqueaderos:</span> 
                          <span className="ml-2 text-zinc-700">{parqueaderos || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Depósito:</span> 
                          <span className="ml-2 text-zinc-700">{deposito ? "Sí" : "No"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Forma de Pago:</span> 
                          <span className="ml-2 text-zinc-700">{formaDePago || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Presupuesto:</span> 
                          <span className="ml-2 text-green-700 font-semibold">{presupuesto || "N/A"}</span>
                        </Text>
                      </div>
                      
                      {comentariosAdicionales && (
                        <>
                          <Text className="text-lg font-bold text-amber-800 mt-6 mb-4 border-b border-amber-300 pb-2">
                            💬 Comentarios Adicionales
                          </Text>
                          <Text className="text-base bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                            {comentariosAdicionales}
                          </Text>
                        </>
                      )}
                    </div>
                  </Column>
                </Row>
              ) : userType === "owner" ? (
                <Row className="py-4">
                  <Column>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <Text className="text-lg font-bold text-green-800 mb-4 border-b border-green-300 pb-2">
                        🏢 Información del Propietario
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Nombre:</span> 
                          <span className="ml-2 text-zinc-700">{nombre || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Correo Electrónico:</span> 
                          <span className="ml-2 text-blue-600">{correo || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Teléfono:</span> 
                          <span className="ml-2 text-zinc-700">{telefono || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Ciudad:</span> 
                          <span className="ml-2 text-zinc-700">{ciudad || "N/A"}</span>
                        </Text>
                      </div>
                      
                      <Text className="text-lg font-bold text-green-800 mt-6 mb-4 border-b border-green-300 pb-2">
                        🏠 Detalles de la Propiedad
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Tipo de Propiedad:</span> 
                          <span className="ml-2 text-zinc-700">
                            {tipoPropiedad
                              ? tipoPropiedad
                                  .split("_")
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                  .join(" ")
                              : "N/A"}
                          </span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Dirección:</span> 
                          <span className="ml-2 text-zinc-700">{direccion || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Edad Propiedad:</span> 
                          <span className="ml-2 text-zinc-700">{edadPropiedad || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Área:</span> 
                          <span className="ml-2 text-zinc-700">{area || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Área Construida:</span> 
                          <span className="ml-2 text-zinc-700">{areaConstruida || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Terraza:</span> 
                          <span className="ml-2 text-zinc-700">{terraza || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Patio:</span> 
                          <span className="ml-2 text-zinc-700">{patio || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Habitaciones:</span> 
                          <span className="ml-2 text-zinc-700">{habitaciones || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Baños:</span> 
                          <span className="ml-2 text-zinc-700">{baños || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Parqueaderos:</span> 
                          <span className="ml-2 text-zinc-700">{parqueaderos || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Piso:</span> 
                          <span className="ml-2 text-zinc-700">{piso || "N/A"}</span>
                        </Text>
                      </div>
                      
                      <Text className="text-lg font-bold text-green-800 mt-6 mb-4 border-b border-green-300 pb-2">
                        ✨ Amenidades
                      </Text>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Estudio:</span> 
                          <span className="ml-2 text-zinc-700">{estudio ? "Sí" : "No"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Depósito:</span> 
                          <span className="ml-2 text-zinc-700">{deposito ? "Sí" : "No"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Balcón:</span> 
                          <span className="ml-2 text-zinc-700">{balcon ? "Sí" : "No"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Vigilancia:</span> 
                          <span className="ml-2 text-zinc-700">{vigilancia ? "Sí" : "No"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Piscina:</span> 
                          <span className="ml-2 text-zinc-700">{piscina ? "Sí" : "No"}</span>
                        </Text>
                      </div>
                      
                      <Text className="text-lg font-bold text-green-800 mt-6 mb-4 border-b border-green-300 pb-2">
                        💰 Información Financiera
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Valor Administración:</span> 
                          <span className="ml-2 text-green-700 font-semibold">{valorAdministracion || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Valor Aproximado:</span> 
                          <span className="ml-2 text-green-700 font-semibold">{valorAproximado || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Situación Jurídica:</span> 
                          <span className="ml-2 text-zinc-700">
                            {situacionJuridica
                              ? situacionJuridica
                                  .split("_")
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                  .join(" ")
                              : "N/A"}
                          </span>
                        </Text>
                        {detalleSituacionJuridica && (
                          <Text className="text-base">
                            <span className="font-semibold text-zinc-800">Detalle Situación Jurídica:</span> 
                            <span className="ml-2 text-zinc-700">{detalleSituacionJuridica}</span>
                          </Text>
                        )}
                      </div>
                      
                      {comentariosAdicionales && (
                        <>
                          <Text className="text-lg font-bold text-green-800 mt-6 mb-4 border-b border-green-300 pb-2">
                            💬 Comentarios Adicionales
                          </Text>
                          <Text className="text-base bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                            {comentariosAdicionales}
                          </Text>
                        </>
                      )}
                    </div>
                  </Column>
                </Row>
              ) : (
                <Row className="py-4">
                  <Column>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <Text className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-300 pb-2">
                        📧 Información de Contacto
                      </Text>
                      
                      <div className="space-y-3">
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Nombre:</span> 
                          <span className="ml-2 text-zinc-700">{nombre || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Correo Electrónico:</span> 
                          <span className="ml-2 text-blue-600">{correo || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Teléfono:</span> 
                          <span className="ml-2 text-zinc-700">{telefono || "N/A"}</span>
                        </Text>
                        <Text className="text-base">
                          <span className="font-semibold text-zinc-800">Asunto:</span> 
                          <span className="ml-2 text-zinc-700">{asunto || "N/A"}</span>
                        </Text>
                      </div>
                      
                      {mensaje && (
                        <>
                          <Text className="text-lg font-bold text-blue-800 mt-6 mb-4 border-b border-blue-300 pb-2">
                            💬 Mensaje
                          </Text>
                          <Text className="text-base bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                            {mensaje}
                          </Text>
                        </>
                      )}
                    </div>
                  </Column>
                </Row>
              )}
            </Section>
            
            <Text className="text-center text-sm text-zinc-500 py-6 border-t border-zinc-200">
              © 2024 | Luis Fernando Realtor | Colombia | www.luisfernandorealtor.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
