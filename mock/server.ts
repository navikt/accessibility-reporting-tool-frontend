import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import * as jsonFile from './report.json';
import * as teams from '../teams.json';

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
  return c.json(teams);
});

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

api.post('/teams/new', (c) => {
  return c.text('oppretter');
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

api.get('/api/criteria', (c) => {
  return c.json([
    {
      title: '1.1.1 Ikke-tekstlig innhold',
      description:
        'All ikke-tekstlig innhold som bilder, ikoner, video og lyd skal ha en tekstlig alternativ tekst som beskriver innholdet.',
      WCAGId: '1.1.1',
      state: 'notTested',
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

api.get('api/testRapport', (c) => {
  return c.json(jsonFile);
});

api.post('/api/reports/new', (c) => {
  // Create a custom object with the desired properties and values
  const initializedReport = {
    id: '123456789',
    title: 'Example Report',
    url: 'https://www.example.com',
    authorEmail: 'example@example.com',
    createdDate: new Date().toISOString(),
    team: {
      id: '123456789',
      name: 'Example Team',
    },
    successCriteria: [
      {
        name: 'Ikke-tekstlig innhold',
        description:
          'Gi brukeren et tekstalternativ for innhold som ikke er tekst.',
        principle: '1.  Mulig å oppfatte',
        guideline: '1.1 Tekstalternativer',
        tools: 'ARC Toolkit',
        number: '1.1.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Ikoner, bilder, grafer',
        status: 'NOT_TESTED',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
      },
      {
        name: 'Bare lyd og bare video (forhåndsinnspilt)',
        description:
          ' Gi brukeren et alternativ når innholdet presenteres kun som video eller lyd.',
        principle: '1.  Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'NOT_TESTED',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.1',
      },
    ],
  };

  return c.json(initializedReport); // Send the custom object as the response
});

serve({
  fetch: api.fetch,
  port: 8787,
});
