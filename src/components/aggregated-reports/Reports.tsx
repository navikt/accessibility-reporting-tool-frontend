import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Textarea,
  TextField,
} from '@navikt/ds-react';
import type { InitializeAggregatedReport } from '@src/types';
import { createAggregatedReport } from '@src/services/reportServices';

interface Report {
  title: string;
  id: string;
  teamName: string;
  teamId: string;
  date: string;
}

interface ReportListProps {
  reports: Report[];
}

const Reports = ({ reports }: ReportListProps) => {
  const [initialData, setInitialData] = useState<InitializeAggregatedReport>({
    descriptiveName: '',
    url: '',
    notes: '',
    reports: [],
  });

  const handleChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <TextField
        label="Tittel på den nye rapporten"
        onChange={handleChenge}
        name="descriptiveName"
      />
      <TextField
        label="URL til den nye rapporten"
        onChange={handleChenge}
        name="url"
      />
      <Textarea
        label="Notater"
        name="notes"
        onChange={(e) => {
          setInitialData({ ...initialData, notes: e.target.value });
        }}
      />
      <CheckboxGroup
        legend="Velg rapporter du ønsker å slå sammen"
        size="small"
        onChange={(e) => {
          setInitialData({
            ...initialData,
            reports: e.map((id) => id),
          });
        }}
      >
        {reports.map((report: Report) => (
          <Checkbox value={report.id} key={report.id}>
            {report.title}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button
        variant="primary"
        onClick={() => createAggregatedReport(initialData)}
      >
        Oprett Rapport
      </Button>
    </div>
  );
};

export default Reports;
