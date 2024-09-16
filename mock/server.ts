import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import * as jsonFile from './report.json';
import * as jsonFile2 from './report2.json';

const api = new Hono();

api.use(
  '/*',
  cors({
    origin: 'http://localhost:4321',
    credentials: true,
  }),
);

const teams = [
  {
    id: 'team-nav',
    name: 'Team Nav.no',
    email: 'teamnavno@example.com',
    members: ['medlem1', 'medlem2', 'medlem3'],
  },
  {
    id: 'team-min-side',
    name: 'Min side',
    email: 'minside@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-test',
    name: 'Team test',
    email: 'teamtest@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-imaginary',
    name: 'Team Imaginary',
    email: 'teamimaginary@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-super',
    name: 'Team Super',
    email: 'teamsuper@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-loftet',
    name: 'Team Loftet',
    email: 'teamloftet@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-masse-venner',
    name: 'Team Ensom',
    email: 'teamensom@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-messi',
    name: 'Team Messi',
    email: 'teammessi@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-ronaldo-better',
    name: 'Team Ronaldo',
    email: 'teamronaldo@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-tull',
    name: 'Team tull',
    email: 'teamtull@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
  {
    id: 'team-ultratull',
    name: 'Team tull, men med lenger navn...',
    email: 'teamtulllenger@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  },
];

api.get('api/teams', (c) => {
  return c.json(teams);
});

api.get('api/users/details', (c) => {
  return c.json({
    email: 'my.user@nav.no',
    name: 'Hakaurlander, JasMaNi',
    teams: teams,
    isAdmin: true,
    reports: [
      {
        title: 'Ayyyy',
        id: '12erh34',
        teamId: 'team-ultratull',
        teamName: 'Team Ultratull',
        date: '2024-07-15',
      },
      {
        title: 'Heihei',
        id: '12erh42',
        teamId: 'team-tull',
        teamName: 'Team Tull',
        date: '2024-08-19',
      },
    ],
  });
});

api.get('api/teams/team-nav/details', (c) => {
  return c.json({
    id: 'team-nav',
    name: 'Team Nav',
    email: 'team.nav@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  });
});

api.get('api/teams/team-messi/details', (c) => {
  return c.json({
    id: 'team-messi',
    name: 'Team Messi',
    email: 'teammessi@example.com',
    members: ['mem1', 'mem2', 'mem3'],
  });
});

api.get('api/teams/team-test/details', (c) => {
  return c.json({
    id: 'team-test',
    name: 'Team Test',
    email: 'team.test@nav.no',
    members: ['Finnes ikke', 'Ikke en ekte dude', 'Skybert'],
  });
});

api.get('/api/reports', (c) => {
  return c.json([
    {
      descriptiveName: 'TestNavn',
      reportId: 'rykutjyrhterg-87',
      teamId: 'team-tull',
      teamName: 'Team Tull',
      lastChanged: '2024-05-10',
    },
    {
      descriptiveName: 'Testy',
      reportId: 'rykutjyrhtehg-67',
      teamId: 'team-ultratull',
      teamName: 'Team Ultratull',
      lastChanged: '2024-08-10',
    },
    {
      descriptiveName: 'Testttttt',
      reportId: 'rykutjyrhqdwerg-12',
      teamId: 'team-tull',
      teamName: 'Team Tull',
      lastChanged: '2024-05-11',
    },
    {
      descriptiveName: 'Hmmm',
      reportId: 'rykutxyrhterg-89',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      lastChanged: '2024-06-10',
    },
  ]);
});

api.get('/api/reports/aggregated', (c) => {
  return c.json([
    {
      title: 'TestNavn',
      id: 'rykutjyrhterg-87',
      teamId: 'team-tull',
      teamName: 'Team Tull',
      date: '2024-05-10',
    },
    {
      title: 'Testy',
      id: 'rykutjyrhtehg-67',
      teamId: 'team-ultratull',
      teamName: 'Team Ultratull',
      date: '2024-08-10',
    },
    {
      title: 'Testttttt',
      id: 'rykutjyrhqdwerg-12',
      teamId: 'team-tull',
      teamName: 'Team Tull',
      date: '2024-05-11',
    },
    {
      title: 'Hmmm',
      id: 'rykutxyrhterg-89',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      date: '2024-06-10',
    },
  ]);
});

api.get('api/teams/team-messi/reports', (c) => {
  return c.json([
    {
      title: 'Hmmm',
      id: 'rykutxyrhterg-79',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      date: '2024-06-10',
    },
    {
      title: 'Messi > Ronaldo',
      id: 'rykutxyrhterg-80',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      date: '2024-06-10',
    },
  ]);
});

api.get('api/users/details', (c) => {
  return c.json({
    email: 'nav@nav.no',
    oid: '01d97f04-270a-4aa6-bb98-cc093b855dab',
  });
});

api.get('api/teams/team-nav/reports', (c) => {
  return c.json([
    {
      title: 'Hmmm!',
      id: 'rykutxyrhterg-79',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      date: '2024-06-10',
    },
    {
      title: 'Messi < Ronaldo',
      id: 'rykutxyrhterg-70',
      teamId: 'team-messi',
      teamName: 'Team Messi',
      date: '2024-06-10',
    },
  ]);
});

api.get('api/teams/team-test/reports', (c) => {
  return c.json([]);
});

api.post('/api/teams/new', (c) => {
  return c.text('det funka');
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

api.get('api/reports/rykutxyrhterg-79', (c) => {
  return c.json(jsonFile2);
});

api.get('api/reports/rykutxyrhterg-80', (c) => {
  return c.json(jsonFile);
});

api.get('api/reports/rykutxyrhterg-70', (c) => {
  return c.json(jsonFile);
});

api.post('/api/reports/new', (c) => {
  return c.json({ id: '123456789' });
});

api.post('/api/admin/aggregated-reports/new', (c) => {
  return c.json({ id: '1234567890' });
});

api.patch('/api/reports/123456789', (c) => {
  return c.json({ messge: 'Report updated' });
});

api.delete('/api/reports/123456789', (c) => {
  return c.json({ message: 'Report deleted' });
});

api.delete('/api/teams/team-nav', (c) => {
  return c.json({ message: 'Team deleted' });
});

api.post('/api/merged-reports/new', (c) => {
  return c.json({ id: '123456789' });
});

// Which information is necessary to get?
api.get('/api/merged-reports/123456789', (c) => {
  return c.json(jsonFile);
});

api.get('/api/reports/aggregated/123456789', (c) => {
  const initializedReport = {
    reportId: '123456789',
    descriptiveName: 'Skikkelig tilgjengelig side',
    url: 'https://www.nav.no/',
    team: {
      id: 'team-team-min-side-fan-club',
      name: 'Team Team Min Side Fan Club',
      email: 'mats.thoresen.nylander@nav.no',
      members: [],
    },
    author: {
      email: 'Mats.Thoresen.Nylander@nav.no',
      oid: '01d97f04-270a-4aa6-bb98-cc093b855dab',
    },
    successCriteria: [
      {
        name: 'Ikke-tekstlig innhold',
        description:
          'Gi brukeren et tekstalternativ for innhold som ikke er tekst.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.1 Tekstalternativer',
        tools: 'ARC Toolkit',
        number: '1.1.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Ikoner, bilder, grafer',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        helpUrl: 'aksel.no',
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.1.1',
      },
      {
        name: 'Bare lyd og bare video (forhåndsinnspilt)',
        description:
          'Gi brukeren et alternativ når innholdet presenteres kun som video eller lyd.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.1',
      },
      {
        name: 'Teksting (forhåndsinnspilt)',
        description: 'Tilby teksting for forhåndsinnspilt video med lyd.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.2',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.2',
      },
      {
        name: 'Synstolking eller mediealternativ (forhåndsinnspilt)',
        description:
          'Tilby en beskrivende tekst eller et lydspor med beskrivelse for videoer som ikke er direktesendt.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.3',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'NOT_TESTED',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.3',
      },
      {
        name: 'Synstolking (forhåndsinnspilt)',
        description:
          'Tilby synstolking til alle videoer som ikke er direktesendinger.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.5',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'NON_COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'AA',
        successCriterionNumber: '1.2.5',
      },
      {
        name: 'Informasjon og relasjoner',
        description: 'Ting skal være kodet som det ser ut som.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.3 Mulig å tilpasse',
        tools: 'DevTools/headingsMap',
        number: '1.3.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: '',
        status: 'NOT_APPLICABLE',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.3.1',
      },
    ],
    created: '2023-10-04T15:24:18.000Z',
    lastChanged: '2023-10-04T15:24:18.000Z',
    hasWriteAccess: true,
  };

  return c.json(initializedReport); // Send the custom object as the response
});

api.get('/api/reports/123456789', (c) => {
  const initializedReport = {
    reportId: '123456789',
    descriptiveName: 'Skikkelig tilgjengelig side',
    url: 'https://www.nav.no/',
    team: {
      id: 'team-team-min-side-fan-club',
      name: 'Team Team Min Side Fan Club',
      email: 'mats.thoresen.nylander@nav.no',
      members: [],
    },
    author: {
      email: 'Mats.Thoresen.Nylander@nav.no',
      oid: '01d97f04-270a-4aa6-bb98-cc093b855dab',
    },
    successCriteria: [
      {
        name: 'Ikke-tekstlig innhold',
        description:
          'Gi brukeren et tekstalternativ for innhold som ikke er tekst.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.1 Tekstalternativer',
        tools: 'ARC Toolkit',
        number: '1.1.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Ikoner, bilder, grafer',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        helpUrl: 'aksel.no',
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.1.1',
      },
      {
        name: 'Bare lyd og bare video (forhåndsinnspilt)',
        description:
          'Gi brukeren et alternativ når innholdet presenteres kun som video eller lyd.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.1',
      },
      {
        name: 'Teksting (forhåndsinnspilt)',
        description: 'Tilby teksting for forhåndsinnspilt video med lyd.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.2',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.2',
      },
      {
        name: 'Synstolking eller mediealternativ (forhåndsinnspilt)',
        description:
          'Tilby en beskrivende tekst eller et lydspor med beskrivelse for videoer som ikke er direktesendt.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.3',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'NOT_TESTED',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.2.3',
      },
      {
        name: 'Synstolking (forhåndsinnspilt)',
        description:
          'Tilby synstolking til alle videoer som ikke er direktesendinger.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.2 Tidsbaserte medier',
        tools: 'Skjønn',
        number: '1.2.5',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: 'Lyd, video, animasjoner',
        status: 'NON_COMPLIANT',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'AA',
        successCriterionNumber: '1.2.5',
      },
      {
        name: 'Informasjon og relasjoner',
        description: 'Ting skal være kodet som det ser ut som.',
        principle: '1. Mulig å oppfatte',
        guideline: '1.3 Mulig å tilpasse',
        tools: 'DevTools/headingsMap',
        number: '1.3.1',
        breakingTheLaw: '',
        lawDoesNotApply: '',
        tooHardToComply: '',
        contentGroup: '',
        status: 'NOT_APPLICABLE',
        wcagUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships',
        helpUrl: null,
        wcagVersion: '2.1',
        wcagLevel: 'A',
        successCriterionNumber: '1.3.1',
      },
    ],
    created: '2023-10-04T15:24:18.000Z',
    lastChanged: '2023-10-04T15:24:18.000Z',
    hasWriteAccess: true,
  };

  return c.json(initializedReport); // Send the custom object as the response
});

serve({
  fetch: api.fetch,
  port: 8787,
});
