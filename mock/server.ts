import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import * as jsonFile from './report.json';

const api = new Hono();

api.use(
    '/*',
    cors({
        origin: 'http://localhost:4321',
        credentials: true,
    }),
);


const teams = [
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
        url: '/team/team-nav-no',
        email: 'teamnavno@example.com',
        members: ["medlem1", "medlem2", "medlem3"],
    },
    {
        navn: 'Min side',
        url: '/team/min-side',
        email: 'minside@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team test',
        url: '/team/team-test',
        email: 'teamtest@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Imaginary',
        url: '/team/team-imaginary',
        email: 'teamimaginary@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Super',
        url: '/team/team-super',
        email: 'teamsuper@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Loftet',
        url: '/team/team-loftet',
        email: 'teamloftet@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Ensom',
        url: '/team/team-ensom',
        email: 'teamensom@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Messi',
        url: '/team/team-messi',
        email: 'teammessi@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team Ronaldo',
        url: '/team/team-ronaldo',
        email: 'teamronaldo@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team tull',
        url: '/team/team-tull',
        email: 'teamtull@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        navn: 'Team tull, men med lenger navn...',
        url: '/team/team-tull-lenger-navn',
        email: 'teamtulllenger@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
];



api.get('/teams', (c) => {
    return c.json(teams);
});

api.get('/api/reports/list', (c) => {
    return c.json([
        {
            navn: "TestNavn",
            url: "https://www.nav.no/test-rapport",
            dato: "2024-05-10",
        },
        {
            navn: "Min Side",
            url: "https://www.nav.no/test-rapport",
            dato: "2024-06-15",
        },
        {
            navn: "Aktivitetsplan",
            url: "https://www.nav.no/test-rapport",
            dato: "2024-05-10",
        },
        {
            navn: "Barnebidrag",
            url: "https://www.nav.no/test-rapport",
            dato: "2024-04-20",
        },
    ]);
});



api.post('/teams/new', (c) => {
    return c.text("oppretter")})

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

api.get('/api/criteria', (c) => {
  return c.json([
    {
      title: '1.1.1 Ikke-tekstlig innhold',
      description:
        'All ikke-tekstlig innhold som bilder, ikoner, video og lyd skal ha en tekstlig alternativ tekst som beskriver innholdet.',
      WCAGId: '1.1.1',
      state: 'no',
    },
    {
      title: '1.2.1 Lyd og videoinnhold',
      description:
        'All lyd og videoinnhold skal ha tekstlig alternativ som beskriver innholdet.',
      WCAGId: '1.2.1',
      state: 'no',
    },
    {
      title: '1.3.1 Info og relasjoner',
      description:
        'Informasjon og relasjoner som presenteres gjennom visuell oppfatning skal også være tilgjengelig for brukere som ikke kan se innholdet.',
      WCAGId: '1.3.1',
      state: 'no',
    },
    {
      title: '1.4.1 Bruk av farger',
      description:
        'Farge skal ikke være den eneste måten å formidle informasjon på, eller skille mellom elementer.',
      WCAGId: '1.4.1',
      state: 'no',
    },
    {
      title: '1.4.3 Kontrast',
      description:
        'Tekst skal ha tilstrekkelig kontrast mot bakgrunnen for å være leselig.',
      WCAGId: '1.4.3',
      state: 'no',
    },
    {
      title: '1.4.4 Endring i tekststørrelse',
      description:
        'Tekst skal kunne forstørres til 200% uten at brukeren mister funksjonalitet eller innhold.',
      WCAGId: '1.4.4',
      state: 'no',
    },
    {
      title: '1.4.5 Bilder av tekst',
      description:
        'Unngå å bruke bilder av tekst, med mindre det er nødvendig for designet.',
      WCAGId: '1.4.5',
      state: 'no',
    },
  ]);
});

api.get('/testRapport', (c) => {
  return c.json(
    {
      jsonFile
    },
  );
});

serve({
    fetch: api.fetch,
    port: 8787,
});
