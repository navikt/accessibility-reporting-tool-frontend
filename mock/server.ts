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
  },
  {
    id: 'team-min-side',
    name: 'Min side',
    email: 'minside@example.com',
  },
  {
    id: 'team-test',
    name: 'Team test',
    email: 'teamtest@example.com',
  },
  {
    id: 'team-imaginary',
    name: 'Team Imaginary',
    email: 'teamimaginary@example.com',
  },
  {
    id: 'team-super',
    name: 'Team Super',
    email: 'teamsuper@example.com',
  },
  {
    id: 'team-loftet',
    name: 'Team Loftet',
    email: 'teamloftet@example.com',
  },
  {
    id: 'team-masse-venner',
    name: 'Team Ensom',
    email: 'teamensom@example.com',
  },
  {
    id: 'team-messi',
    name: 'Team Messi',
    email: 'teammessi@example.com',
  },
  {
    id: 'team-ronaldo-better',
    name: 'Team Ronaldo',
    email: 'teamronaldo@example.com',
  },
  {
    id: 'team-tull',
    name: 'Team tull',
    email: 'teamtull@example.com',
  },
  {
    id: 'team-ultratull',
    name: 'Team tull, men med lenger navn...',
    email: 'teamtulllenger@example.com',
  },
];

teams.forEach((team) => {
  api.get(`api/teams/${team.id}`, (c) => {
    return c.json({
      id: team.id,
      name: team.name,
      email: team.email,
      members: ['mem1', 'mem2', 'mem3'], // Mock members for each team
    });
  });
});

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

api.get('api/user', (c) => {
  return c.json({
    reports: [
      {
        id: 'c39c0dc4-ebde-4e6c-92b7-01a7ee47f45d',
        title: 'hello',
        url: 'nim.test.nav.no',
        teamId: 'team-uu-sommer',
        teamName: 'Team UU Sommer',
        date: '2024-09-30T11:01:10.000Z',
        isPartOfNavNo: true,
      },
      {
        id: 'ad2785de-8283-483b-b2a0-e8cc11b8b187',
        title: 'This is an Aggregated Report',
        url: 'test.aggregated.com',
        teamId: '',
        teamName: '',
        date: '2024-09-30T08:16:12.000Z',
        isPartOfNavNo: false,
      },
    ],
    teams: teams,
    name: 'Hakimi, Nima',
    email: 'Nima.Hakimi@nav.no',
    isAdmin: true,
  });
});

api.get('/api/reports', (c) => {
  return c.json([
    {
      id: '56b00314-b0a4-44f8-b841-97d97349f3c2',
      title: 'Nytt navn på rapport',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'sommer-a11y',
      teamName: 'Sommer a11y',
      date: '2024-09-20T09:53:35.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '73ea46dd-9af2-47e8-8e3f-df533f3616fa',
      title: 'Ordentlig tilgjengelig side',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'sommer-a11y',
      teamName: 'Sommer a11y',
      date: '2024-09-20T09:53:36.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '6c68683f-13b3-4213-80a7-cf7371fa4240',
      title: 'UU er kult 2.0',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'sommer-a11y',
      teamName: 'Sommer a11y',
      date: '2024-09-23T08:23:12.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '67c25c35-3565-4fda-95ec-d2991cfa249f',
      title: 'Min Nye Side',
      url: 'nav.no',
      teamId: 'team-presentasjon',
      teamName: 'Team Presentasjon',
      date: '2024-08-06T14:08:36.000Z',
      isPartOfNavNo: false,
    },
    {
      id: 'e6986350-d4ee-4608-baa6-c5d2b86410b1',
      title: 'Min enda nyere side!',
      url: 'ogsånav.no',
      teamId: 'team-presentasjon',
      teamName: 'Team Presentasjon',
      date: '2024-08-06T14:13:14.000Z',
      isPartOfNavNo: false,
    },
    {
      id: 'bcda1591-7104-439f-b0a9-2203df2884dc',
      title: 'Tester rapport V5 -- update',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'min-side',
      teamName: 'min side',
      date: '2024-08-27T06:21:15.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '169dac2a-0f9c-414b-8cf7-cc28bf66d3c6',
      title: 'Tester rapport V4 sjekk at tittell oppdateres',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'min-side',
      teamName: 'min side',
      date: '2024-08-27T11:13:51.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '659833c4-a563-46c2-9081-b41a0c2475e5',
      title: 'Ny a11y-statement frontend',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'sommer-a11y',
      teamName: 'Sommer a11y',
      date: '2024-09-26T13:24:01.000Z',
      isPartOfNavNo: true,
    },
    {
      id: 'a8a172aa-d397-48af-a0dd-31046645fe31',
      title: 'tullball',
      url: 'tull.ball.no',
      teamId: 'team-uu-sommer',
      teamName: 'Team UU Sommer',
      date: '2024-09-26T13:59:46.000Z',
      isPartOfNavNo: true,
    },
    {
      id: 'eba3b90d-e3a4-492c-a92b-ebafe5c19918',
      title: 'Demosida',
      url: 'nav.no',
      teamId: 'team-demo',
      teamName: 'Team Demo',
      date: '2024-08-15T10:29:16.000Z',
      isPartOfNavNo: false,
    },
    {
      id: '0e3f10a8-8e6e-466f-86cf-5f6a220112b8',
      title: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'sommer-a11y',
      teamName: 'Sommer a11y',
      date: '2024-09-26T15:12:10.000Z',
      isPartOfNavNo: true,
    },
    {
      id: '87c7f9ad-ee79-40ad-baba-8df88d39b6b5',
      title: 'Nav.no',
      url: 'www.nav.no',
      teamId: 'team-min-side-fab-club',
      teamName: 'Team Min side fab club',
      date: '2024-07-18T13:49:05.000Z',
      isPartOfNavNo: false,
    },
    {
      id: 'fa407bf2-b147-48d5-bbbf-e0654876bad1',
      title: 'ikkenavno',
      url: 'ikke.nav.no',
      teamId: 'team-uu-sommer',
      teamName: 'Team UU Sommer',
      date: '2024-09-27T06:34:04.000Z',
      isPartOfNavNo: false,
    },
    {
      id: '9cbde386-56a5-4565-bd8e-30cb12493ac6',
      title: 'Tester rapport igjen',
      url: 'https://a11y-statement-ny.ansatt.dev.nav.no/',
      teamId: 'min-side',
      teamName: 'min side',
      date: '2024-08-19T11:59:41.000Z',
      isPartOfNavNo: false,
    },
    {
      id: 'cf3f6442-afa1-4cf9-854f-48889157aeec',
      title: 'FinnHjelpemiddel',
      url: 'https://finnhjelpemiddel.nav.no/',
      teamId: 'finnhjelpemiddel',
      teamName: 'Finnhjelpemiddel',
      date: '2024-09-11T08:12:38.000Z',
      isPartOfNavNo: true,
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

api.delete('/api/reports/123456789', (c) => {
  return c.json({ message: 'Report deleted' });
});

api.delete('/api/admin/reports/aggregated/1234567890', (c) => {
  return c.json({ message: 'Report deleted' });
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
    notes: 'Dette er en testrapport',
    hasWriteAccess: true,
    isPartOfNavNo: false,
  };

  return c.json(initializedReport); // Send the custom object as the response
});

// Generic route for any report ID (catches all remaining report IDs)
api.get('/api/reports/:id', (c) => {
  const id = c.req.param('id');

  // Return a mock report with the requested ID
  const mockReport = {
    reportId: id,
    descriptiveName: 'Mock rapport',
    url: 'https://www.nav.no/',
    team: {
      id: 'team-mock',
      name: 'Mock Team',
      email: 'mock@nav.no',
      members: [],
    },
    author: {
      email: 'mock@nav.no',
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
        status: 'NOT_TESTED',
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
    ],
    created: '2023-10-04T15:24:18.000Z',
    lastChanged: '2023-10-04T15:24:18.000Z',
    notes: 'Dette er en mock-rapport',
    hasWriteAccess: true,
    isPartOfNavNo: false,
  };

  return c.json(mockReport);
});

serve({
  fetch: api.fetch,
  port: 8787,
});
