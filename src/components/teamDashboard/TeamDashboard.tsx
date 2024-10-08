import { useEffect, useState } from 'react';
import styles from './TeamDashboard.module.css';
import { BodyLong, Heading, Radio, RadioGroup, Select } from '@navikt/ds-react';
import { PieChart } from '@mui/x-charts';
import { fetcher } from '@src/utils/client/api.ts';
import ReportList from '@components/ReportList/ReportList';
import useSWR from 'swr';
import EditTeamModal from '@components/Modal/TeamModals/EditTeamModal';
import CreateReportModal from '@components/Modal/createReportModal/CreateReportModal';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import type { ReportSummary } from '@src/types.ts';

interface TeamDashboardProps {
  teamId: string;
  isMyTeam: Boolean;
}

function TeamDashboard(props: TeamDashboardProps) {
  const [currentReportId, setCurrentReportId] = useState<string>('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { data: reportListData, isLoading: isLoadingList } = useSWR(
    { url: `${apiProxyUrl}/teams/${props.teamId}/reports` },
    fetcher,
  );

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
    if (reportListData && reportListData.length > 0) {
      setCurrentReportId(reportListData[0].id);
    }
  }, [reportListData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.teamDashboard}>
      <div className={styles.teamHeader}>
        <Heading level="2" size="large">
          {teamData?.name}
        </Heading>
        {props.isMyTeam && (
          <div className={styles.buttons}>
            <CreateReportModal />
          </div>
        )}
      </div>
      <div className={styles.chartAndInfo}>
        {hasReport ? (
          <section className={styles.pieChart}>
            {isMobile ? (
              <>
                <Select
                  label="Velg rapport"
                  defaultValue={currentReportId}
                  onChange={(e) => setCurrentReportId(e.target.value)}
                >
                  {reportListData.map((report: ReportSummary) => (
                    <option key={report.id} value={report.id}>
                      {report.title}
                    </option>
                  ))}
                </Select>
                <p>Oppfylt: {COMPLIANT}</p>
                <p>Ikke oppfylt: {NOT_COMPLIANT}</p>
                <p>Ikke aktuelle: {NOT_APPLICABLE}</p>
                <p>Ikke testet: {NOT_TESTED}</p>
              </>
            ) : (
              <>
                <RadioGroup
                  name="report"
                  legend="Velg rapport"
                  value={currentReportId}
                  onChange={setCurrentReportId}
                >
                  {reportListData.map((report: ReportSummary) => (
                    <Radio key={report.id} value={report.id}>
                      {report.title}
                    </Radio>
                  ))}
                </RadioGroup>
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
                        return ''; // Dette her gjør at verdien ikke dukker opp to ganger når man hovrer over en del av pie charten
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
              </>
            )}
          </section>
        ) : (
          <section className={styles.pieChart}>
            <BodyLong>Ingen rapporter tilgjengelig</BodyLong>
          </section>
        )}
        <section className={styles.teamInfo}>
          <div className={styles.teamInfoHeader}>
            <Heading level="3" size="medium">
              Team detaljer
            </Heading>
            {props.isMyTeam && <EditTeamModal teamId={props.teamId} />}
          </div>
          <span className={styles.divider} />
          <Heading level="3" size="small">
            Team ansvarlig
          </Heading>
          <BodyLong>{teamData?.email}</BodyLong>
          <span className={styles.divider} />
          <Heading level="3" size="small">
            Teammedlemmer
          </Heading>
          <ul className={styles.memberList}>
            {teamData?.members.map((member: string) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className={styles.reportList}>
        <Heading level="3" size="small">
          Rapporter
        </Heading>
        <ReportList reports={reportListData} />
      </section>
    </div>
  );
}

export default TeamDashboard;
