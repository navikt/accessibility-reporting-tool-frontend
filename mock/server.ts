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
      url: "/team"
    },
    {
      navn: "Min side",
      url: "/team"
    },
    {
      navn: "Team test",
      url: "/team"
    },
    {
      navn: "Team ikkefins",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull",
      url: "/team"
    },
    {
      navn: "Team tull, men med lenger navn...",
      url: "/team"
    }
  ]);
});

serve( {
  fetch: api.fetch,
  port: 8787
});
