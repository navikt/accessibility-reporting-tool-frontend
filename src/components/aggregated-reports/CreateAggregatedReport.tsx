import { useState } from 'react';
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
  const [initialData, setInitialData] = useState<InitializeAggregatedReport>({
    descriptiveName: aggregatedReport?.descriptiveName || '',
    url: aggregatedReport?.url || '',
    notes: aggregatedReport?.notes || '',
    reports:
      aggregatedReport?.fromReports.map((report) => {
        return report.reportId;
      }) || [],
  });

  const handleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.value });
  };

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
      <CheckboxGroup
        legend="Velg rapporter du ønsker å slå sammen"
        size="small"
        defaultValue={initialData.reports}
        onChange={(e) => {
          setInitialData({
            ...initialData,
            reports: e.map((id) => id),
          });
        }}
      >
        {reports.map((report: ReportSummary) => (
          <Checkbox value={report.id} key={report.id}>
            {report.title}
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
