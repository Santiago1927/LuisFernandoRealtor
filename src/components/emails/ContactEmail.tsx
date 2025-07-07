// Importaciones de componentes de React Email para crear plantillas de correo electrónico
// Estos componentes permiten crear emails HTML responsivos y bien estructurados
import {
  Body,        // Contenedor principal del cuerpo del email
  Container,   // Contenedor para centrar y limitar el ancho del contenido
  Column,      // Componente para crear columnas en el layout
  Head,        // Sección de metadatos del email
  Html,        // Elemento raíz del documento HTML
  Preview,     // Texto de vista previa que aparece en el cliente de correo
  Row,         // Componente para crear filas en el layout
  Section,     // Sección de contenido con estilos predefinidos
  Text,        // Componente para texto con estilos consistentes
  Tailwind,    // Wrapper para usar clases de Tailwind CSS en el email
} from "@react-email/components";
import * as React from "react";

/**
 * Interfaz TypeScript que define todas las propiedades posibles para el email de contacto
 * 
 * Esta interfaz incluye campos para diferentes tipos de formularios:
 * - Formulario de comprador (buyer): campos específicos para personas que buscan comprar
 * - Formulario de propietario (owner): campos específicos para personas que quieren vender
 * - Formulario de contacto general (contact): campos básicos de contacto
 * 
 * La mayoría de campos son opcionales (?) para permitir flexibilidad en el uso
 */
interface ContactEmailProps {
  // Campos básicos de contacto (requeridos)
  correo: string;      // Dirección de correo electrónico del remitente
  nombre: string;      // Nombre completo del remitente
  telefono: string;    // Número de teléfono del remitente
  userType: string;    // Tipo de usuario: "buyer", "owner", o "contact"

  // Campos específicos para compradores y propietarios
  area?: string;                    // Área total de la propiedad
  areaConstruida?: string;          // Área construida de la propiedad
  balcon?: boolean;                 // Indica si la propiedad tiene balcón
  baños?: string;                   // Número de baños
  comentariosAdicionales?: string;  // Comentarios adicionales del usuario
  ciudad?: string;                  // Ciudad donde se encuentra la propiedad
  deposito?: boolean;               // Indica si la propiedad tiene depósito
  detalleSituacionJuridica?: string; // Detalles adicionales de la situación jurídica
  direccion?: string;               // Dirección de la propiedad
  edadPropiedad?: string;           // Edad de la propiedad
  estudio?: boolean;                // Indica si la propiedad tiene estudio
  formaDePago?: string;             // Forma de pago preferida
  habitaciones?: string;            // Número de habitaciones
  one?: boolean;                    // Campo adicional (propósito no especificado)
  parqueaderos?: string;            // Número de parqueaderos
  patio?: string;                   // Tamaño o descripción del patio
  piscina?: boolean;                // Indica si la propiedad tiene piscina
  piso?: string;                    // Número de piso
  presupuesto?: string;             // Presupuesto del comprador
  tipoPropiedad?: string;           // Tipo de propiedad (casa, apartamento, etc.)
  situacionJuridica?: string;       // Situación jurídica de la propiedad
  terraza?: string;                 // Tamaño o descripción de la terraza
  two?: boolean;                    // Campo adicional (propósito no especificado)
  valorAdministracion?: string;     // Valor de la administración
  valorAproximado?: string;         // Valor aproximado de la propiedad
  vigilancia?: boolean;             // Indica si la propiedad tiene vigilancia

  // Campos específicos para formulario de contacto general
  asunto?: string;                  // Asunto del mensaje
  mensaje?: string;                 // Contenido del mensaje
}

/**
 * Componente ContactEmail - Plantilla de correo electrónico para formularios de contacto
 * 
 * Este componente genera un email HTML responsivo que se envía cuando un usuario
 * completa cualquiera de los formularios del sitio web (comprador, propietario, contacto).
 * 
 * Características:
 * - Renderizado condicional basado en el tipo de usuario
 * - Formato consistente y profesional
 * - Diseño responsivo usando Tailwind CSS
 * - Manejo de campos opcionales con valores por defecto
 * - Formateo automático de texto (capitalización)
 */
export const ContactEmail: React.FC<ContactEmailProps> = ({
  // Desestructuración de todas las propiedades de la interfaz
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
    // Estructura HTML base del email
    <Html>
      {/* Metadatos del email */}
      <Head />
      
      {/* Texto de vista previa que aparece en el cliente de correo */}
      <Preview>
        {userType === "contact" 
          ? "Nuevo mensaje de contacto"
          : "Nueva consulta de propiedad"
        }
      </Preview>

      {/* Wrapper de Tailwind CSS para aplicar estilos */}
      <Tailwind>
        {/* Cuerpo principal del email con fondo gris y fuente sans-serif */}
        <Body className="bg-gray-50 font-sans my-auto mx-auto max-w-[465px]">
          
          {/* Contenedor principal con fondo blanco y sombra */}
          <Container className="mx-auto p-4 bg-white shadow-md rounded-lg">
            
            {/* Sección principal del contenido con borde superior */}
            <Section className="border-t border-gray-200">
              
              {/* Encabezado del email con saludo y descripción */}
              <Row className="py-4">
                <Column>
                  {/* Saludo personalizado */}
                  <Text className="text-center font-semibold text-2xl mb-2">
                    Hola Luis Fernando,
                  </Text>
                  
                  {/* Descripción del tipo de mensaje recibido */}
                  <Text className="text-center font-medium text-lg">
                    {userType === "contact" 
                      ? "Has recibido un nuevo mensaje de contacto desde tu sitio web!"
                      : "Has recibido una nueva consulta de propiedad desde tu sitio web!"
                    }
                  </Text>
                </Column>
              </Row>

              {/* Renderizado condicional basado en el tipo de usuario */}
              {userType === "buyer" ? (
                // Sección para formulario de comprador
                <Row className="py-2">
                  <Column>
                    {/* Información básica del comprador */}
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
                    
                    {/* Preferencias de propiedad del comprador */}
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
                // Sección para formulario de propietario
                <Row className="py-2">
                  <Column>
                    {/* Información básica del propietario */}
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
                    
                    {/* Detalles específicos de la propiedad a vender */}
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
                    
                    {/* Amenidades y características de la propiedad */}
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
                    
                    {/* Información financiera y legal */}
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
                // Sección para formulario de contacto general
                <Row className="py-2">
                  <Column>
                    {/* Información básica del contacto */}
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
            
            {/* Pie de página con información de copyright */}
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

// Exportación por defecto del componente
export default ContactEmail;
