import ReportList from '@components/ReportList/ReportList';
import CreateReportModal from '@components/Modal/createReportModal/CreateReportModal';
import { Tabs, Select, Heading } from '@navikt/ds-react';
import { fetcher } from '@src/utils/client/api.ts';
import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import TeamDashboard from './TeamDashboard';
import styles from './MyTeam.module.css';
import { apiProxyUrl } from '@src/utils/client/urls.ts';

interface Team {
  email: string;
  id: string;
  members: string[];
  name: string;
  url: string;
}

function MyTeam() {
  //Vises kun hvis teamet du ser på er ditt. Er det første du ser på forsiden, dersom
  //du er med i minst ett team. Her har du muligheten til å velge hvilket team du vil se
  //dashboard for. Dashboardet vises i henhold til teamet som er valgt i drop-down menyen.

  const { data: userData, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  const [state, setState] = useState('mittTeam');
  const [currentTeamId, setCurrentTeamId] = useState(userData?.teams[0].id); //Hvilken team som sees
  const userName = userData?.name.split(',');

  useEffect(() => {
    setCurrentTeamId(userData?.teams[0].id);
  }, [userData]);
  console.log(currentTeamId);
  console.log(userData);

  if (isLoading) {
    return null;
  }

  return (
    <main className={styles.teamContent}>
      <header>
        <h1 className={styles.h1}>
          God dag, {userName[1]} {userName[0]}
        </h1>
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
              value={currentTeamId}
              onChange={(e) => setCurrentTeamId(e.target.value)}
            >
              {userData?.teams.map((team: Team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Select>
            <CreateReportModal />
          </header>

          <TeamDashboard teamId={currentTeamId} isMyTeam />
        </Tabs.Panel>
        <Tabs.Panel
          value="mineRapporter"
          className="h-24 w-full bg-gray-50 p-4"
        >
          <header className={styles.myReportsHeader}>
            <CreateReportModal />
          </header>
          <section className={styles.myReportsContainer}>
            <section>
              <Heading size="large">Mine rapporter</Heading>
            </section>
            <ReportList reports={userData?.reports} />
          </section>
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}

export default MyTeam;
