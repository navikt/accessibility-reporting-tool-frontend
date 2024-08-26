import { useState } from 'react';
import { Button, Checkbox, CheckboxGroup, TextField } from '@navikt/ds-react';
import type { InitializeAggregatedReport } from '@src/types';
import { createAggregatedReport } from '@src/services/reportServices';

interface Rapport {
  title: string;
  id: string;
  teamName: string;
  teamId: string;
  date: string;
}

interface ReportListProps {
  reports: Rapport[];
}

const Reports = ({ reports }: ReportListProps) => {
  const [chosenReports, setChosenReports] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <TextField
        label="Tittel på den nye rapporten"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="URL til den nye rapporten"
        onChange={(e) => setUrl(e.target.value)}
      />
      <CheckboxGroup
        legend="Velg rapporter du ønsker å slå sammen"
        size="small"
        onChange={setChosenReports}
      >
        {reports.map((report: Rapport) => (
          <Checkbox value={report.id} key={report.id}>
            {report.title}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button
        variant="primary"
        onClick={() =>
          createAggregatedReport({
            title: title,
            url: url,
            reports: chosenReports,
          } as InitializeAggregatedReport)
        }
      >
        Oprett Rapport
      </Button>
    </div>
  );
};

export default Reports;
