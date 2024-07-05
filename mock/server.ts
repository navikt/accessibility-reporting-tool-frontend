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

api.get('api/testRapport', (c) => {
  return c.json(jsonFile);});

serve({
    fetch: api.fetch,
    port: 8787,
});
