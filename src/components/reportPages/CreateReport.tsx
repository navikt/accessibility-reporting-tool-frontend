import { useState, useEffect } from 'react';
import Criterion from './criterion/Criterion';
import type { CriterionType, Report } from '@src/types';
import { getReport, updateReport } from '@src/services/reportServices';
import useSWR from 'swr';
import { Tabs, TextField } from '@navikt/ds-react';
import _ from 'lodash';

interface CreateReportProps {
  id: string | undefined;
}

const CreateReport = ({ id }: CreateReportProps) => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>([]);
  const [activeTab, setActiveTab] = useState('metadata');

  const {
    data: report,
    isLoading,
    mutate,
  } = useSWR<Report>(`/reports/${id}`, getReport);

  const updateReportData = async (updates: Partial<Report>) => {
    try {
      await updateReport(id as string, updates);
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriterionChange = (
    WCAGId: string,
    fieldToUpdate: string,
    updatedData: string,
  ) => {
    setCriteriaData((prev) => {
      const index = prev.findIndex((criterion) => criterion.number === WCAGId);
      if (index !== -1) {
        const newCriteriaData = [...prev];
        newCriteriaData[index] = {
          ...newCriteriaData[index],
          [fieldToUpdate]: updatedData,
        };
        updateReportData({
          successCriteria: [
            {
              ...newCriteriaData[index],
              [fieldToUpdate]: updatedData,
            },
          ],
        });
        return newCriteriaData;
      }
      return prev;
    });
  };

  const handleMetadataChange = _.debounce(
    (fieldToUpdate: string, updatedData: string) => {
      updateReportData({ [fieldToUpdate]: updatedData });
    },
    500,
  );

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
              disabled={!report?.hasWriteAccess}
              onChange={(e) =>
                handleMetadataChange('descriptiveName', e.target.value)
              }
            />

            <TextField
              label="URL"
              id="report-url"
              name="report-url"
              defaultValue={report?.url}
              disabled={!report?.hasWriteAccess}
              onChange={(e) => handleMetadataChange('url', e.target.value)}
            />
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
                hasWriteAccess={report?.hasWriteAccess as boolean}
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
                hasWriteAccess={report?.hasWriteAccess as boolean}
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
                hasWriteAccess={report?.hasWriteAccess as boolean}
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
                hasWriteAccess={report?.hasWriteAccess as boolean}
              />
            ))}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default CreateReport;
