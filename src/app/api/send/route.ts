import ContactEmail from "@/components/emails/ContactEmail";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const dataForm = await request.json();
  try {
    const data = await resend.emails.send({
      from: "Luis Fernando Realtor <admin@luisfernandorealtor.com>",
      to: ["a.santiago.salas.b@gmail.com", "realtorluisfernando@gmail.com"],
      subject: "Nuevo mensaje desde tu sitio web",
      text: "",
      react: React.createElement(ContactEmail, dataForm),
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
