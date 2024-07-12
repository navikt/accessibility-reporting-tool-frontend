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
        id: 'team-nav',
        name: 'Team Nav.no',
        url: '/team/team-nav-no',
        email: 'teamnavno@example.com',
        members: ["medlem1", "medlem2", "medlem3"],
    },
    {
        id: 'team-min-side',
        name: 'Min side',
        url: '/team/min-side',
        email: 'minside@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-test',
        name: 'Team test',
        url: '/team/team-test',
        email: 'teamtest@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-imaginary',
        name: 'Team Imaginary',
        url: '/team/team-imaginary',
        email: 'teamimaginary@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-super',
        name: 'Team Super',
        url: '/team/team-super',
        email: 'teamsuper@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-loftet',
        name: 'Team Loftet',
        url: '/team/team-loftet',
        email: 'teamloftet@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-masse-venner',
        name: 'Team Ensom',
        url: '/team/team-ensom',
        email: 'teamensom@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-meeeessi',
        name: 'Team Messi',
        url: '/team/team-messi',
        email: 'teammessi@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-ronaldo-better',
        name: 'Team Ronaldo',
        url: '/team/team-ronaldo',
        email: 'teamronaldo@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-tull',
        name: 'Team tull',
        url: '/team/team-tull',
        email: 'teamtull@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-ultratull',
        name: 'Team tull, men med lenger navn...',
        url: '/team/team-tull-lenger-navn',
        email: 'teamtulllenger@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
];

api.get('api/teams', (c) => {
    return c.json(teams);
});

api.get('api/myUser', (c) => {
    return c.json({
        email: "my.user@nav.no",
        myOrganizationUnits: teams,
        myReports: [{
            id: "12erh34",
            organizationUnit: teams[0],
            lastChanged: "2024-05-10",
            lastUpdatedBy: "Nima Hakimi"
        }]

    })
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
