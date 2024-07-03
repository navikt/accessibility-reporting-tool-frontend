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
      navn: 'TestNavn',
      url: 'https://www.nav.no/test-rapport',
      dato: '2024-05-10',
    },
    {
      navn: 'Min Side',
      url: 'https://www.nav.no/test-rapport',
      dato: '2024-06-15',
    },
    {
      navn: 'Aktivitetsplan',
      url: 'https://www.nav.no/test-rapport',
      dato: '2024-05-10',
    },
    {
      navn: 'Barnebidrag',
      url: 'https://www.nav.no/test-rapport',
      dato: '2024-04-20',
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
      navn: 'Nav',
      url: 'https://www.nav.no/test-rapport',
    },
    {
      navn: 'nav.no',
      url: 'https://www.nav.no/test-rapport',
    },
    {
      navn: 'Samlet rapport for nav.no',
      url: 'https://www.nav.no/test-rapport',
    },
  ]);
});

api.post(`/api/reports/${reportId}`, (c) => {
  const reportData = c.req.body;

  console.log('Received report data:', reportData);

  return c.json({ message: 'Report received successfully' });
});

serve({
  fetch: api.fetch,
  port: 8787,
});
