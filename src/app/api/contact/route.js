import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sanitizeString, validateString, collectErrors, LIMITS } from "@/lib/validation";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, email, subject, message } = body;

    const error = collectErrors(
      validateString(name, 'name', { maxLength: LIMITS.NAME }),
      validateString(email, 'email', { maxLength: LIMITS.NAME }),
      validateString(message, 'message', { maxLength: LIMITS.MESSAGE }),
      validateString(subject, 'subject', { required: false, maxLength: LIMITS.NAME })
    );
    if (error) return NextResponse.json({ error }, { status: 400 });

    const cleanName    = sanitizeString(name, LIMITS.NAME);
    const cleanSubject = subject ? sanitizeString(subject, LIMITS.NAME) : 'General Inquiry';
    const cleanMessage = sanitizeString(message, LIMITS.MESSAGE);

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '587'),
        secure: parseInt(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${cleanName}" <${SMTP_USER}>`,
        replyTo: email,
        to: "jamphy.admin@gmail.com",
        subject: `[Jamphy Contact] ${cleanSubject} - ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
      });
    } else {
      console.log("No SMTP credentials found. Logging contact form submission:");
      console.log({ name, email, subject, message });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
