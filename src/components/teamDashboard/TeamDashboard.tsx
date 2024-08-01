import { useEffect, useState } from 'react';
import styles from './TeamDashboard.module.css';
import { BodyLong, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { PieChart } from '@mui/x-charts';
import { fetcher } from '@src/utils/client/api.ts';
import ReportList from '@components/ReportList/ReportList';
import useSWR from 'swr';
import EditTeamModal from '@components/Modal/EditTeamModal';
import { apiProxyUrl } from '@src/utils/client/urls.ts';

interface TeamReport {
  title: string;
  id: string;
  teamId: string;
  date: string;
}

interface TeamDashboardProps {
  teamId: String;
  isMyTeam: Boolean;
}

function TeamDashboard(props: TeamDashboardProps) {
  //Kode for team-dashboard. Brukes for å vise oversikt over medlemmene og rapportene til et team (som korresponderer med teamId i props),
  //samt tilgjengelighetsstatusen deres.

  const { data: reportListData, isLoading: isLoadingList } = useSWR(
    { url: `${apiProxyUrl}/teams/${props.teamId}/reports` },
    fetcher,
  );
  const [currentReportId, setCurrentReportId] = useState<string>('');

  const { data: teamData, isLoading: isLoadingTeamData } = useSWR(
    { url: `${apiProxyUrl}/teams/${props.teamId}/details` },
    fetcher,
  );

  const { data: reportData, isLoading: isLoadingReport } = useSWR(
    { url: `${apiProxyUrl}/reports/${currentReportId}` },
    fetcher,
  );

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
      setCurrentReportId(reportListData[0]?.id);
      console.log(currentReportId);
    }
  }, [isLoadingList, props.teamId, isLoadingTeamData, reportListData]);

  return (
    <section className={styles.gridWrapper}>
      <article className={styles.accessibilityStatusContainer}>
        <Heading level="2" size="large">
          Tilgjengelighetsstatus for {teamData?.name}
        </Heading>
        {hasReport ? (
          <section className={styles.accessibilityStatusInner}>
            <aside className={styles.selectReportContainer}>
              <Heading level="3" size="medium">
                Rapporter
                <RadioGroup
                  legend="Velg rapport"
                  onChange={setCurrentReportId}
                  value={currentReportId}
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
            <section className={styles.chartContainer}>
              <PieChart
                colors={['red', 'gray', 'green', 'yellow']}
                series={[
                  {
                    data: [
                      {
                        value: COMPLIANT,
                        color: 'green',
                        label: `${COMPLIANT} krav oppfylt`,
                      },
                      {
                        value: NOT_COMPLIANT,
                        color: 'red',
                        label: `${NOT_COMPLIANT} krav ikke oppfylt`,
                      },
                      {
                        value: NOT_APPLICABLE,
                        color: 'gray',
                        label: `${NOT_APPLICABLE} krav ikke aktuelle`,
                      },
                      {
                        value: NOT_TESTED,
                        color: '#FFB703',
                        label: `${NOT_TESTED} krav ikke testet`,
                      },
                    ],
                    valueFormatter: () => {
                      return ''; //Dette her gjør at verdien ikke dukker opp to ganger når man hovrer over en del av pie charten
                    },
                    innerRadius: 30,
                    outerRadius: 150,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                  },
                ]}
                width={600}
                height={300}
              />
            </section>
          </section>
        ) : (
          <>
            <BodyLong>
              Her var det tomt, da teamet du har valgt ikke har noen rapporter!
            </BodyLong>
          </>
        )}
      </article>
      <article className={styles.membersContainer}>
        <div className={styles.editTeamBtn}>
          {props.isMyTeam && !isLoadingTeamData ? (
            <EditTeamModal teamId={teamData?.id} />
          ) : (
            <></>
          )}
        </div>
        <Heading level="3" size="medium">
          Admin
        </Heading>
        <p className={styles.adminMail}>{teamData?.email}</p>
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
        {/*
        <Heading level="2" size="large" spacing>
          Samlerapporter
        </Heading>
        */}
      </section>
    </section>
  );
}

export default TeamDashboard;
