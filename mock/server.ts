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
        email: 'teamnavno@example.com',
        members: ["medlem1", "medlem2", "medlem3"],
    },
    {
        id: 'team-min-side',
        name: 'Min side',
        email: 'minside@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-test',
        name: 'Team test',
        email: 'teamtest@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-imaginary',
        name: 'Team Imaginary',
        email: 'teamimaginary@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-super',
        name: 'Team Super',
        email: 'teamsuper@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-loftet',
        name: 'Team Loftet',
        email: 'teamloftet@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-masse-venner',
        name: 'Team Ensom',
        email: 'teamensom@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-messi',
        name: 'Team Messi',
        email: 'teammessi@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-ronaldo-better',
        name: 'Team Ronaldo',
        email: 'teamronaldo@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-tull',
        name: 'Team tull',
        email: 'teamtull@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
    {
        id: 'team-ultratull',
        name: 'Team tull, men med lenger navn...',
        email: 'teamtulllenger@example.com',
        members: ["mem1", "mem2", "mem3"],
    },
];

api.get('api/teams', (c) => {
    return c.json(teams);
});

api.get('api/users/details', (c) => {
    return c.json({
        email: "my.user@nav.no",
        name: "JasMaNi Hakaurlander",
        teams: teams,
        reports: [
            {
                title: "Ayyyy",
                id: "12erh34",
                teamId: 'team-ultratull',
                date: "2024-07-15"
            },
            {
                title: "Heihei",
                id: "12erh42",
                teamId: 'team-tull',
                date: "2024-08-19"
            },

        ]

    })
});

api.get('/api/reports/list', (c) => {
    return c.json([
        {
            title: "TestNavn",
            id: "rykutjyrhterg-87",
            teamId: "team-tull",
            date: "2024-05-10",
        },
        {
            title: "Testy",
            id: "rykutjyrhtehg-67",
            teamId: "team-ultratull",
            date: "2024-08-10",
        },
        {
            title: "Testttttt",
            id: "rykutjyrhqdwerg-12",
            teamId: "team-tull",
            date: "2024-05-11",
        },
        {
            title: "Hmmm",
            id: "rykutxyrhterg-89",
            teamId: "team-messi",
            date: "2024-06-10",
        },
    ]);
});



api.post('/teams/new', (c) => {
    return c.text("oppretter")
})

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
    return c.json(jsonFile);
});

serve({
    fetch: api.fetch,
    port: 8787,
});
