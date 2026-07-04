import nodemailer from "nodemailer";
import { cookies } from "next/headers";

import { contactData } from "@/features/contact/data";
import { createClient } from "@/lib/supabase";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

const fallbackRecipient =
  contactData.contacts.find((contact) => contact.type === "Email")?.value ??
  "";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildMessageBody({ name, email, subject, message }: Required<Pick<ContactPayload, "name" | "email" | "subject" | "message">>) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Message:</strong><br />${safeMessage}</p>
  `;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (payload.company) {
    return Response.json(
      { message: "Message submission failed." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return Response.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error: supabaseError } = await supabase
    .from("contacts")
    .insert([{ name, email, subject, message }]);

  if (supabaseError) {
    console.error("Supabase insert error:", supabaseError);
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailFrom = process.env.SMTP_FROM ?? smtpUser;
  const recipient = process.env.CONTACT_RECEIVER_EMAIL ?? fallbackRecipient;

  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom || !recipient) {
    return Response.json(
      {
        message:
          "Email is not configured yet. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and CONTACT_RECEIVER_EMAIL.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const html = buildMessageBody({ name, email, subject, message });
  const text = [
    "New contact form submission",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "Message:",
    message,
  ].join("\n");

  await transporter.sendMail({
    from: mailFrom,
    to: recipient,
    replyTo: email,
    subject: `Portfolio contact form: ${subject}`,
    text,
    html,
  });

  return Response.json(
    { message: "Your message has been sent successfully." },
    { status: 200 },
  );
}
