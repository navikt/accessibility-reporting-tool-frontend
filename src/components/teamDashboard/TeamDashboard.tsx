import type { UserProps } from '@src/types';
import { apiUrl } from '@src/urls';
import { useEffect, useState, type SetStateAction } from 'react';
import useSWRImmutable from 'swr/immutable';
import styles from './TeamDashboard.module.css';
import { BodyLong, Button, Heading, Select, Tabs } from '@navikt/ds-react';
import { FilePlusIcon } from '@navikt/aksel-icons';
import { PieChart } from '@mui/x-charts';
import { fetcher } from '@src/utils/api.client';
import ReportList from '@components/ReportList/ReportList';

function TeamDashboard(props: { team: any }) {
  //"Generisk kode for team-dashboard. Selvstendig komponent."

  const { data: reportData, isLoading: isLoadingReport } = useSWRImmutable(
    { url: `${apiUrl}/testRapport` },
    fetcher,
  );

  const { data: reportListData, isLoading: isLoadingList } = useSWRImmutable(
    { url: `${apiUrl}/reports/list` },
    fetcher,
  );

  const [currentTeam, setCurrentTeam] = useState(props.team); //Hvilket team som sees. Brukes ikke per nå, men nyttig når vi skal vise andre teams

  let successCriteriaCount = 0;
  successCriteriaCount = reportData?.successCriteria.length - 1;

  let NOT_COMPLIANT = 0;
  let COMPLIANT = 0;
  let NOT_APPLICABLE = 0;
  let NOT_TESTED = 0;

  for (let i = 0; i <= successCriteriaCount; i++) {
    if (reportData?.successCriteria[i].status == 'NOT_TESTED') {
      NOT_TESTED++;
    } else if (reportData?.successCriteria[i].status == 'COMPLIANT') {
      COMPLIANT++;
    } else if (reportData?.successCriteria[i].status == 'NOT_APPLICABLE') {
      NOT_APPLICABLE++;
    } else {
      //if status == 'NOT_COMPLIANT'
      NOT_COMPLIANT++;
    }
  }

  if (isLoadingReport) {
    return null;
  }

  return (
    <section className={styles.gridWrapper}>
      <section className={styles.lastChanges}>
        <Heading level="3" size="medium">
          Siste endringer
        </Heading>
      </section>
      <article className={styles.accessibilityStatusContainer}>
        <Heading level="2" size="large">
          Tilgjengelighetsstatus
        </Heading>
        <section className={styles.accessibilityStatusInner}>
          <aside className={styles.selectStatementContainer}>
            <Heading level="3" size="medium">
              Erklæringer
            </Heading>
          </aside>

          <PieChart
            colors={['red', 'gray', 'green', 'yellow']}
            series={[
              {
                data: [
                  { value: COMPLIANT, color: 'green', label: 'Oppfylt' },
                  {
                    value: NOT_COMPLIANT,
                    color: 'red',
                    label: 'Ikke oppfylt',
                  },
                  {
                    value: NOT_APPLICABLE,
                    color: 'gray',
                    label: 'Ikke aktuelt',
                  },
                  {
                    value: NOT_TESTED,
                    color: '#FFB703',
                    label: 'Ikke testet',
                  },
                ],
                innerRadius: 30,
                outerRadius: 150,
                paddingAngle: 2,
                cornerRadius: 5,
                startAngle: 0,
                endAngle: 360,
              },
            ]}
            width={550}
            height={300}
          />
        </section>
      </article>
      <article className={styles.membersContainer}>
        <Heading level="3" size="medium">
          Admin
        </Heading>
        <Heading level="3" size="medium">
          Medlemmer
        </Heading>
      </article>
      <section className={styles.reportsContainer}>
        <Heading level="2" size="large" spacing>
          Rapporter
        </Heading>
        {isLoadingList ? (
          <p>Loading...</p>
        ) : (
          <ReportList reports={reportListData} />
        )}

        <Heading level="2" size="large" spacing>
          Samlerapporter
        </Heading>
      </section>
    </section>
  );
}

interface Team {
  email: string;
  id: string;
  members: string[];
  name: string;
  url: string;
}

function MyTeam() {
  //Vises kun hvis teamet du ser på er ditt.
  const { data: userData, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/users/details` },
    fetcher,
  );

  const [state, setState] = useState('mittTeam');
  const [currentTeam, setCurrentTeam] = useState(userData.teams[0].id); //Hvilken team som sees

  //console.log(data);
  //console.log(data?.author);
  //console.log(NOT_COMPLIANT);

  if (isLoading) {
    return null;
  }

  return (
    <main className={styles.teamContent}>
      <header>
        <h1 className={styles.h1}>God dag {userData?.name}</h1>
        <BodyLong>
          Denne teksten sjekker bare at team-selector funker: {currentTeam}
        </BodyLong>
      </header>

      <Tabs value={state} onChange={setState}>
        <Tabs.List>
          <Tabs.Tab value="mittTeam" label="Mitt team" />
          <Tabs.Tab value="mineRapporter" label="Mine rapporter" />
        </Tabs.List>
        <Tabs.Panel value="mittTeam" className="h-24 w-full bg-gray-50 p-4">
          <header className={styles.myTeamHeader}>
            <Select
              className={styles.selector}
              label="Velg team"
              value={currentTeam}
              onChange={(e) => setCurrentTeam(e.target.value)}
            >
              {userData?.teams.map((team: Team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Select>
            <Button icon={<FilePlusIcon />}>Lag ny erklæring</Button>
          </header>

          <TeamDashboard team="someTeam" />
        </Tabs.Panel>
        <Tabs.Panel
          value="mineRapporter"
          className="h-24 w-full bg-gray-50 p-4"
        >
          <header className={styles.myReportsHeader}>
            <Button icon={<FilePlusIcon />} className={styles.addStatementBtn}>
              Lag ny erklæring
            </Button>
          </header>
          <section className={styles.myReportsContainer}>
            <section>
              <Heading size="large">Mine rapporter</Heading>
              <Select
                className={styles.selector}
                label="Velg team"
                value={currentTeam}
                onChange={(e) => setCurrentTeam(e.target.value)}
              >
                {userData?.teams.map((team: Team) => {
                  return (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Select>
            </section>
            <ReportList reports={userData?.reports} />
          </section>
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}

function ConditionalTeamDashboard(props: { isMyTeam: boolean }) {
  //Vises hvis du ikke er en del av teamet du vil se på.

  const [isMyTeam, setIsMyTeam] = useState(props.isMyTeam); //Sjekk om brukeren er en del av teamet som vises

  if (isMyTeam) {
    return <MyTeam />;
  }

  return <TeamDashboard team="someTeam" />;
}

export default ConditionalTeamDashboard;
