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

api.get('/teams', (c) => {
  return c.json([
    {
      navn: "Team Nav.no",
      url: "https://www.nav.no/test-rapport"
    },
    {
      navn: "Min side",
      url: "https://www.nav.no/test-rapport"
    },
    {
      navn: "Team test",
      url: "https://www.nav.no/test-rapport"
    },
  ]);
});

serve(api);
