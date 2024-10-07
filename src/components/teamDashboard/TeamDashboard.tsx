import { useEffect, useState } from 'react';
import styles from './TeamDashboard.module.css';
import { BodyLong, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { PieChart } from '@mui/x-charts';
import { fetcher } from '@src/utils/client/api.ts';
import ReportList from '@components/ReportList/ReportList';
import useSWR from 'swr';
import EditTeamModal from '@components/Modal/TeamModals/EditTeamModal';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import type { ReportSummary } from '@src/types.ts';

interface TeamDashboardProps {
  teamId: String;
  isMyTeam: Boolean;
}

function TeamDashboard(props: TeamDashboardProps) {
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
  const { NOT_COMPLIANT, COMPLIANT, NOT_APPLICABLE, NOT_TESTED } =
    reportData?.successCriteria.reduce(
      (
        acc: {
          NOT_COMPLIANT: number;
          COMPLIANT: number;
          NOT_APPLICABLE: number;
          NOT_TESTED: number;
        },
        criterion: { status: string },
      ) => {
        switch (criterion.status) {
          case 'NOT_TESTED':
            acc.NOT_TESTED++;
            break;
          case 'COMPLIANT':
            acc.COMPLIANT++;
            break;
          case 'NOT_APPLICABLE':
            acc.NOT_APPLICABLE++;
            break;
          default:
            acc.NOT_COMPLIANT++;
            break;
        }
        return acc;
      },
      { NOT_COMPLIANT: 0, COMPLIANT: 0, NOT_APPLICABLE: 0, NOT_TESTED: 0 },
    ) || { NOT_COMPLIANT: 0, COMPLIANT: 0, NOT_APPLICABLE: 0, NOT_TESTED: 0 };

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
                  {reportListData.map((reportSummary: ReportSummary) => {
                    return (
                      <Radio key={reportSummary.id} value={reportSummary.id}>
                        {reportSummary.title}
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
                        label: `Krav oppfylt: ${COMPLIANT}`,
                      },
                      {
                        value: NOT_COMPLIANT,
                        color: 'red',
                        label: `Krav ikke oppfylt: ${NOT_COMPLIANT}`,
                      },
                      {
                        value: NOT_APPLICABLE,
                        color: 'gray',
                        label: `Krav ikke aktuelle: ${NOT_APPLICABLE}`,
                      },
                      {
                        value: NOT_TESTED,
                        color: '#FFB703',
                        label: `Krav ikke testet: ${NOT_TESTED}`,
                      },
                    ],
                    valueFormatter: () => {
                      return ''; //Dette her gjør at verdien ikke dukker opp to ganger når man hovrer over en del av pie charten
                    },
                    innerRadius: 30,
                    outerRadius: 150,
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                  },
                ]}
                slotProps={{
                  legend: {
                    labelStyle: {
                      fontSize: 20,
                      fontFamily: 'Source Sans Pro',
                    },
                  },
                }}
                width={540}
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
      </section>
    </section>
  );
}

export default TeamDashboard;
