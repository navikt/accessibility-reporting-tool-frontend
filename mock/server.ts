import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/api', (c) => {
  return c.json([
      {
        navn: "TestNavn",
        url: "https://www.nav.no/test-rapport"
      },
      {
          navn: "Min Side",
          url: "https://www.nav.no/test-rapport"
      },
      {
          navn: "Aktivitetsplan",
          url: "https://www.nav.no/test-rapport"
      },
      {
          navn: "Barnebidrag",
          url: "https://www.nav.no/test-rapport"
      },
  ]);
});

api.get('/samlerapporter', (c) => {
    return c.json([
        {
            navn: "Nav",
            url: "https://www.nav.no/test-rapport"
        },
        {
            navn: "nav.no",
            url: "https://www.nav.no/test-rapport"
        },
        {
            navn: "Samlet rapport for nav.no",
            url: "https://www.nav.no/test-rapport"
        },
    ]);
});

serve( {
  fetch: api.fetch,
  port: 8787
});
