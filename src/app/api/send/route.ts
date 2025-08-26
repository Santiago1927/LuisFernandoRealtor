import ContactEmail from "@/components/contact/emails/ContactEmailTemplate";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const dataForm = await request.json();
  
  console.log('=== API SEND DEBUG ===');
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('Data received:', JSON.stringify(dataForm, null, 2));
  
  // Verificar si la API key está configurada
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return Response.json({ 
      error: { 
        message: 'Configuración de email pendiente. Los datos se han guardado correctamente en la base de datos.' 
      } 
    }, { status: 200 }); // Retornamos 200 porque los datos sí se guardaron en Firestore
  }
  
  try {
    const data = await resend.emails.send({
      from: "Luis Fernando Realtor <admin@luisfernandorealtor.com>",
      to: ["a.santiago.salas.b@gmail.com", "realtorluisfernando@gmail.com"],
      subject: "Nuevo mensaje desde tu sitio web",
      text: "",
      react: React.createElement(ContactEmail, dataForm),
    });
    
    console.log('Email sent successfully:', data);
    return Response.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ 
      error: { 
        message: error instanceof Error ? error.message : 'Error desconocido al enviar email' 
      } 
    }, { status: 500 });
  }
}
