import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Textarea,
  TextField,
} from '@navikt/ds-react';
import type {
  AggregatedReport,
  InitializeAggregatedReport,
  ReportSummary,
} from '@src/types';
import { createAggregatedReport } from '@src/services/reportServices';
import styles from './CreateAggregatedReport.module.css';

interface ReportListProps {
  reports: ReportSummary[];
  aggregatedReport?: AggregatedReport;
}

const Reports = ({ reports, aggregatedReport }: ReportListProps) => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<InitializeAggregatedReport>({
    descriptiveName: aggregatedReport?.descriptiveName || '',
    url: aggregatedReport?.url || '',
    notes: aggregatedReport?.notes || '',
    reports: selectedReports,
  });

  const [selectNavNo, setSelectNavNo] = useState<boolean>(false);

  const handleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.value });
  };

  const handleSelectNavNo = () => {
    setSelectNavNo(!selectNavNo);
  };

  useEffect(() => {
    if (selectNavNo) {
      const currentlySelectedReports = reports
        .filter((report) => report.isPartOfNavNo)
        .map((report) => report.id);

      setSelectedReports(currentlySelectedReports);
      setInitialData({ ...initialData, reports: currentlySelectedReports });
    }
    if (!selectNavNo && !aggregatedReport) {
      setSelectedReports([]);
      setInitialData({ ...initialData, reports: [] });
    }
    if (!selectNavNo && aggregatedReport) {
      const currentlySelectedReports = reports
        .filter((report) =>
          aggregatedReport.fromReports
            .map((r) => r.reportId)
            .includes(report.id),
        )
        .map((report) => report.id);
      setSelectedReports(currentlySelectedReports);
      setInitialData({
        ...initialData,
        reports: currentlySelectedReports,
      });
    }
  }, [selectNavNo]);

  return (
    <div className={styles.createReportContainer}>
      <TextField
        label="Tittel på den nye rapporten"
        onChange={handleChenge}
        name="descriptiveName"
        defaultValue={initialData.descriptiveName}
      />
      <TextField
        label="URL til den nye rapporten"
        onChange={handleChenge}
        name="url"
        defaultValue={initialData.url}
      />
      <Textarea
        label="Notater"
        name="notes"
        defaultValue={initialData.notes}
        onChange={(e) => {
          setInitialData({ ...initialData, notes: e.target.value });
        }}
      />
      <Checkbox onChange={handleSelectNavNo}>
        Huk av alle "nav.no"-rapporter
      </Checkbox>
      <CheckboxGroup
        legend="Velg rapporter du ønsker å slå sammen"
        size="small"
        value={selectedReports}
        onChange={(e) => {
          setSelectedReports(e);
          setInitialData({
            ...initialData,
            reports: e,
          });
        }}
      >
        {reports.map((report: ReportSummary) => (
          <Checkbox value={report.id} key={report.id}>
            {report.title ? report.title : '(Uten navn)'}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button
        variant="primary"
        onClick={() => createAggregatedReport(initialData)}
        className={styles.createReportButton}
      >
        Oprett rapport
      </Button>
    </div>
  );
};

export default Reports;
