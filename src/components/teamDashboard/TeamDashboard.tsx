import { apiProxyUrl } from '@src/urls.client.ts';
import { useEffect, useState, type SetStateAction } from 'react';
import useSWRImmutable from 'swr/immutable';
import styles from './TeamDashboard.module.css';
import {
  BodyLong,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Tabs,
} from '@navikt/ds-react';
import { PieChart } from '@mui/x-charts';
import { fetcher } from '@src/utils/api.client';
import ReportList from '@components/ReportList/ReportList';
import CreateReportModal from '@components/reportPages/createReportModal/CreateReportModal';
import useSWR from 'swr';

interface Team {
  email: string;
  id: string;
  members: string[];
  name: string;
  url: string;
}

interface TeamReport {
  title: string;
  id: string;
  teamId: string;
  date: string;
}

interface TeamDashboardProps {
  teamId: String;
}

function TeamDashboard({ teamId }: TeamDashboardProps) {
  //"Generisk kode for team-dashboard. Selvstendig komponent."
  const [currentReportId, setCurrentReportId] = useState<string>();

  const { data: reportListData, isLoading: isLoadingList } = useSWR(
    { url: `${apiProxyUrl}/teams/${teamId}/reports` },
    fetcher,
  );

  const { data: teamData, isLoading: isLoadingTeamData } = useSWR(
    { url: `${apiProxyUrl}/teams/${teamId}/details` },
    fetcher,
  );

  const { data: reportData, isLoading: isLoadingReport } = useSWR(
    { url: `${apiProxyUrl}/reports/${currentReportId}` },
    fetcher,
  );

  const handleChange = (val: string) => setCurrentReportId(val);
  const hasReport = reportListData && reportListData.length > 0;

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
  useEffect(() => {
    if (!isLoadingList && !isLoadingTeamData && hasReport && !isLoadingReport) {
      console.log(currentReportId);
      setCurrentReportId(reportListData[0].id);
      console.log(currentReportId);
    }
  }, [
    isLoadingList,
    teamId,
    isLoadingTeamData,
    isLoadingReport,
    reportListData,
  ]);

  if (isLoadingReport || isLoadingTeamData || isLoadingList) {
    return <h1>Loading...</h1>;
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
        {hasReport && (
          <section className={styles.accessibilityStatusInner}>
            <aside className={styles.selectReportContainer}>
              <Heading level="3" size="medium">
                Rapporter
                <RadioGroup
                  legend="Velg rapport"
                  onChange={handleChange}
                  defaultValue={currentReportId}
                >
                  {reportListData.map((teamReport: TeamReport) => {
                    return (
                      <Radio key={teamReport.id} value={teamReport.id}>
                        {teamReport.title}
                      </Radio>
                    );
                  })}
                </RadioGroup>
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
        )}
      </article>
      <article className={styles.membersContainer}>
        <Heading level="3" size="medium">
          Admin
        </Heading>
        <p>{teamData?.email}</p>
        <Heading level="3" size="medium">
          Medlemmer
        </Heading>
        <ul className={styles.membersList}>
          {teamData?.members.map((members: string) => {
            return (
              <li key={members} value={members}>
                {members}
              </li>
            );
          })}
        </ul>
      </article>
      <section className={styles.reportsContainer}>
        <Heading level="2" size="large" spacing>
          Rapporter
        </Heading>

        <ReportList reports={reportListData} />

        <Heading level="2" size="large" spacing>
          Samlerapporter
        </Heading>
      </section>
    </section>
  );
}

function MyTeam() {
  //Vises kun hvis teamet du ser på er ditt.
  const { data: userData, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  const [state, setState] = useState('mittTeam');
  const [currentTeamId, setCurrentTeamId] = useState(userData?.teams[0].id); //Hvilken team som sees
  //const [reportList, setReportList] = useState('');

  {
    /*
    ###THIS CODE IS NOT USED AS OF NOW
  let { data: teamReports, isLoading: isTeamReportsLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/teams/${currentTeamId}/reports` },
    fetcher,
  );

  useEffect(() => {
    if (!isTeamReportsLoading) setReportList(teamReports);
  }, [isTeamReportsLoading, currentTeamId]);

    if (isLoading || isTeamReportsLoading) {
    return null;
  }

  */
  }

  if (isLoading) {
    return null;
  }

  return (
    <main className={styles.teamContent}>
      <header>
        <h1 className={styles.h1}>God dag {userData?.name}</h1>
        <BodyLong>
          Denne teksten sjekker bare at team-selector funker: {currentTeamId}
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

          <TeamDashboard teamId={currentTeamId} />
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

  //return <TeamDashboard teamId="someTeam" />;
}

export default ConditionalTeamDashboard;
