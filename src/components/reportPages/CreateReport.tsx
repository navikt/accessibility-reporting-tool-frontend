import { useState, useEffect } from 'react';
import Criterion from './criterion/Criterion';
import type { CriterionType, Report } from '@src/types';
import { getReport } from '@src/services/reportServices';
import useSWR from 'swr';
import { Tabs, TextField } from '@navikt/ds-react';
interface CreateReportProps {
  id: string | undefined;
}

const CreateReport = ({ id }: CreateReportProps) => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>([]);
  const [activeTab, setActiveTab] = useState('metadata');

  const { data: report, isLoading } = useSWR<Report>(
    `/reports/${id}`,
    getReport,
  );

  const handleCriterionChange = (WCAGId: string, updatedData: string) => {
    setCriteriaData((prev) => {
      const index = prev.findIndex((criterion) => criterion.number === WCAGId);
      console.log('WCAGId:', updatedData);
      if (index !== -1) {
        const newCriteriaData = [...prev];
        newCriteriaData[index] = {
          ...newCriteriaData[index],
          status: updatedData,
        };
        return newCriteriaData;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (!isLoading && report) {
      setCriteriaData(report.successCriteria);
    }
  }, [isLoading, report]);

  if (isLoading) {
    return <div>Loading report...</div>;
  }

  return (
    <div>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="metadata" label="Metadata" />
          <Tabs.Tab value="NOT_TESTED" label="Ikke testet" />
          <Tabs.Tab value="NON_COMPLIANT" label="Ikke tilfredsstilt" />
          <Tabs.Tab value="COMPLIANT" label="Tilfredsstilt" />
          <Tabs.Tab value="NOT_APPLICABLE" label="Ikke aktuelt" />
        </Tabs.List>
        <Tabs.Panel value="metadata">
          <div>
            <TextField
              label="Rapportnavn"
              id="report-name"
              name="report-name"
              defaultValue={report?.descriptiveName}
            />

            <TextField label="URL" id="report-url" name="report-url" />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="NOT_TESTED">
          {criteriaData
            ?.filter((criterion) => criterion.status === 'NOT_TESTED')
            .map((criterion) => (
              <Criterion
                key={criterion.number}
                criterion={criterion}
                handleChange={handleCriterionChange}
              />
            ))}
        </Tabs.Panel>
        <Tabs.Panel value="NON_COMPLIANT">
          {criteriaData
            ?.filter((criterion) => criterion.status === 'NON_COMPLIANT')
            .map((criterion) => (
              <Criterion
                key={criterion.number}
                criterion={criterion}
                handleChange={handleCriterionChange}
              />
            ))}
        </Tabs.Panel>
        <Tabs.Panel value="COMPLIANT">
          {criteriaData
            ?.filter((criterion) => criterion.status === 'COMPLIANT')
            .map((criterion) => (
              <Criterion
                key={criterion.number}
                criterion={criterion}
                handleChange={handleCriterionChange}
              />
            ))}
        </Tabs.Panel>
        <Tabs.Panel value="NOT_APPLICABLE">
          {criteriaData
            ?.filter((criterion) => criterion.status === 'NOT_APPLICABLE')
            .map((criterion) => (
              <Criterion
                key={criterion.number}
                criterion={criterion}
                handleChange={handleCriterionChange}
              />
            ))}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default CreateReport;
