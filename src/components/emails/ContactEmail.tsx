import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

// Determina la URL base para los recursos
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000/`;

// Definición de las props utilizando una interfaz
interface ContactEmailProps {
  fecha: string;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  telefono: string;
}

// Componente de email con props tipadas para personalización
export const ContactEmail: React.FC<ContactEmailProps> = ({
  fecha,
  nombre,
  email,
  asunto,
  mensaje,
  telefono,
}) => {
  return (
    <Html>
      <Head />
      <Preview>New Message</Preview>
      <Tailwind>
        <Body className="bg-white font-sans my-auto mx-auto max-w-[465px]">
          <Container className="mx-auto p-[20px] max-w-[465px]">
            <Section className="py-8 px-5">
              <Img
                src={`${baseUrl}/logo.png`}
                width={50}
                alt="Luis Fernando Logo"
              />
            </Section>
            <Section className="border border-black border-opacity-10 rounded">
              <Row className="py-2">
                <Img width={620} src={`${baseUrl}/Banner.png`} />
              </Row>
              <Row className="py-4">
                <Column>
                  <Text className="text-center font-semibold text-3xl">
                    Hola Luis Fernando,
                  </Text>
                  <Text className="text-center font-semibold text-xl">
                    Has recibido un nuevo mensaje desde tu sitio web!
                  </Text>
                </Column>
              </Row>
              <Row className="py-2">
                <Column>
                  <Text className="text-base">
                    <b>Fecha: </b>
                    {fecha || new Date().toLocaleDateString()}
                  </Text>
                  <Text className="text-base">
                    <b>Nombre: </b>
                    {nombre || "Anónimo"}
                  </Text>
                  <Text className="text-base">
                    <b>Correo Electrónico: </b>
                    {email || "No proporcionado"}
                  </Text>
                  <Text className="text-base">
                    <b>Asunto: </b>
                    {asunto || "Sin asunto"}
                  </Text>
                  <Text className="text-base">
                    <b>Mensaje: </b>
                    {mensaje || "Sin mensaje"}
                  </Text>
                  <Text className="text-base">
                    <b>Teléfono: </b>
                    {telefono || "No proporcionado"}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Text className="text-center text-sm text-black text-opacity-70">
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
