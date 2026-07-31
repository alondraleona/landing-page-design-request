import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

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

  return c.json({ success: true });
});

Deno.serve(app.fetch);