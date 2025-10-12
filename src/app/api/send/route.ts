/**
 * API ROUTE PARA ENVÍO DE EMAILS CON PLANTILLAS OPTIMIZADAS
 *
 * Esta API maneja el envío de emails desde los formularios del sitio web
 * utilizando Resend como servicio de envío y plantillas React Email optimizadas para Gmail.
 *
 * Características:
 * - Selección automática de plantilla según tipo de formulario
 * - Asuntos dinámicos y personalizados
 * - Manejo robusto de errores
 * - Logging detallado para debugging
 * - Fallback graceful si no hay API key configurada
 */

import {
  BuyerEmailTemplate,
  OwnerEmailTemplate,
  ContactEmailTemplate,
  getEmailTemplate,
} from "@/components/emails";
import React from "react";
import { Resend } from "resend";

// Inicializar cliente de Resend con la API key del entorno
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handler POST para el envío de emails desde formularios
 *
 * @param request - Request objeto con los datos del formulario
 * @returns Response con el resultado del envío o error
 */
export async function POST(request: Request) {
  // Extraer datos del formulario del cuerpo de la petición
  const dataForm = await request.json();

  // Logging detallado para debugging en desarrollo
  console.log("=== API SEND DEBUG ===");
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("Data received:", JSON.stringify(dataForm, null, 2));

  /**
   * Validación de configuración - verificar que la API key existe
   * Si no existe, el sistema sigue funcionando (datos se guardan en Firestore)
   * pero no se envían emails
   */
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return Response.json(
      {
        error: {
          message:
            "Configuración de email pendiente. Los datos se han guardado correctamente en la base de datos.",
        },
      },
      { status: 200 } // Status 200 porque los datos SÍ se guardaron correctamente
    );
  }

  try {
    /**
     * SELECCIÓN INTELIGENTE DE PLANTILLA
     * Basada en el campo 'userType' determina qué plantilla usar
     */
    const userType = dataForm.userType || "contact"; // Fallback a 'contact'
    const EmailTemplate = getEmailTemplate(userType);

    /**
     * GENERACIÓN DINÁMICA DE ASUNTOS DE EMAIL
     * Cada tipo de formulario tiene un asunto específico y descriptivo
     */
    let subject = "Nueva consulta desde tu sitio web";
    let fromName = "Luis Fernando Realtor";

    switch (userType) {
      case "buyer":
        subject = `🏠 Nueva consulta de comprador - ${
          dataForm.nombre || "Cliente"
        }`;
        break;
      case "owner":
        subject = `🏘️ Nueva propiedad para vender - ${
          dataForm.tipoPropiedad || "Propiedad"
        }`;
        break;
      case "contact":
        subject = `💌 Nuevo mensaje de contacto${
          dataForm.asunto ? ` - ${dataForm.asunto}` : ""
        }`;
        break;
      default:
        subject = `📧 Nueva consulta - ${dataForm.nombre || "Cliente"}`;
    }

    const data = await resend.emails.send({
      from: `${fromName} <contacto@realhaus.com.co>`,
      to: ["realtorluisfernando@gmail.com"],
      subject: subject,
      text: `Nueva consulta de ${dataForm.nombre} (${dataForm.correo})`,
      react: React.createElement(EmailTemplate as any, dataForm),
    });

    console.log("Email sent successfully:", data);
    return Response.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Error desconocido al enviar email",
        },
      },
      { status: 500 }
    );
  }
}
