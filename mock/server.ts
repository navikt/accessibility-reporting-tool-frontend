import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

const api = new Hono();

api.use(
  '/*',
  cors({
    origin: 'http://localhost:4321',
    credentials: true,
  }),
);

api.get('/api/reports/list', (c) => {
  return c.json([
    {
      name: 'TestNavn',
      url: 'https://www.nav.no/test-rapport',
      date:"20.06.2024"
    },
    {
      name: 'Min Side',
      url: 'https://www.nav.no/test-rapport',
      date:"20.06.2024"
    },
    {
      name: 'Aktivitetsplan',
      url: 'https://www.nav.no/test-rapport',
      date:"20.06.2024"
    },
    {
      name: 'Barnebidrag',
      url: 'https://www.nav.no/test-rapport',
      date:"20.06.2024"
    },
  ]);
});

api.get('/teams', (c) => {
  return c.json([
    {
      navn: 'Team Nav.no',
      url: '/team',
    },
    {
      navn: 'Min side',
      url: '/team',
    },
    {
      navn: 'Team test',
      url: '/team',
    },
    {
      navn: 'Team Imaginary',
      url: '/team',
    },
    {
      navn: 'Team Super',
      url: '/team',
    },
    {
      navn: 'Team Loftet',
      url: '/team',
    },
    {
      navn: 'Team Ensom',
      url: '/team',
    },
    {
      navn: 'Team Messi',
      url: '/team',
    },
    {
      navn: 'Team Ronaldo',
      url: '/team',
    },
    {
      navn: 'Team tull',
      url: '/team',
    },
    {
      navn: 'Team tull',
      url: '/team',
    },
    {
      navn: 'Team tull, men med lenger navn...',
      url: '/team',
    },
  ]);
});

api.get('/api/reports/summary', (c) => {
  return c.json([
    {
      name: 'Nav',
      url: 'https://www.nav.no/test-rapport',
    },
    {
      name: 'nav.no',
      url: 'https://www.nav.no/test-rapport',
    },
    {
      name: 'Samlet rapport for nav.no',
      url: 'https://www.nav.no/test-rapport',
    },
  ]);
});

serve({
  fetch: api.fetch,
  port: 8787,
});
