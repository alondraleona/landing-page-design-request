import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

const NOTIFY_EMAIL = "hola@alostudio.pe";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("RESEND_API_KEY not set, skipping email notification");
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Alo Studio <notificaciones@alostudio.pe>",
        to: [NOTIFY_EMAIL],
        reply_to: data.email,
        subject: `Nuevo mensaje de contacto — ${data.name}`,
        html: `
          <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Empresa:</strong> ${escapeHtml(data.company || "—")}</p>
          <p><strong>Servicio de interés:</strong> ${escapeHtml(data.service || "—")}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.log("Resend error:", res.status, await res.text());
    }
  } catch (err) {
    console.log("Failed to send contact notification email:", err);
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/server/make-server-150c1629/health", (c) => {
  return c.json({ status: "ok" });
});

// Receives contact form submissions and stores them for later review
app.post("/server/make-server-150c1629/contacto", async (c) => {
  const body = await c.req.json();
  const { name, email, company, service, message } = body;

  if (!name || !email || !message) {
    return c.json({ error: "Faltan campos requeridos" }, 400);
  }

  const key = `contacto:${Date.now()}:${crypto.randomUUID()}`;
  await kv.set(key, {
    name,
    email,
    company: company ?? "",
    service: service ?? "",
    message,
    receivedAt: new Date().toISOString(),
  });

  await sendContactNotification({ name, email, company, service, message });

  return c.json({ success: true });
});

Deno.serve(app.fetch);