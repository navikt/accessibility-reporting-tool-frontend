import ReportList from '@components/ReportList/ReportList';
import CreateReportModal from '@components/Modal/createReportModal/CreateReportModal';
import { Tabs, Select, Heading } from '@navikt/ds-react';
import { useState } from 'react';
import TeamDashboard from './TeamDashboard';
import styles from './MyTeam.module.css';
import type { Team, User } from '@src/types.ts';

interface MyTeamProps {
  user: User;
}

function MyTeam({ user }: MyTeamProps) {
  const [tabState, setTabState] = useState('teamView');
  const [currentTeamId, setCurrentTeamId] = useState(user.teams[0].id); //Hvilken team som sees
  const userName = user.name.split(',');
  const isMyTeam = user.teams.map((team) => team.id).includes(currentTeamId);

  return (
    <div className={styles.teamContent}>
      <Heading level="1" size="large" className={styles.h1}>
        Hei {userName[1]}! 👋
      </Heading>

      <Tabs value={tabState} onChange={setTabState}>
        <Tabs.List>
          <Tabs.Tab value="teamView" label="Mitt team" />
          <Tabs.Tab value="myReports" label="Mine rapporter" />
        </Tabs.List>
        <Tabs.Panel value="teamView" className="h-24 w-full bg-gray-50 p-4">
          <div className={styles.myTeamHeader}>
            <Select
              className={styles.selector}
              label="Velg team"
              value={currentTeamId}
              onChange={(e) => setCurrentTeamId(e.target.value)}
            >
              {user.teams.map((team: Team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Select>
          </div>

          <TeamDashboard teamId={currentTeamId} isMyTeam={isMyTeam} />
        </Tabs.Panel>
        <Tabs.Panel value="myReports" className="h-24 w-full bg-gray-50 p-4">
          <header className={styles.myReportsHeader}>
            <CreateReportModal />
          </header>
          <section className={styles.myReportsContainer}>
            <section>
              <Heading size="large">Mine rapporter</Heading>
            </section>
            <ReportList reports={user.reports} />
          </section>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default MyTeam;
