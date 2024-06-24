import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/api', (c) => {
  return c.json([]);
});

serve(api);
