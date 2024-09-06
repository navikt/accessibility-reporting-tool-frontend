import { useState, useEffect } from 'react';
import Criterion from './criterion/Criterion';
import type { AggregatedReport, CriterionType, Report } from '@src/types.ts';
import {
  getReport,
  updateAggregatedReport,
  updateReport,
} from '@src/services/reportServices';
import useSWR from 'swr';
import { Tabs, TextField, Chips, Heading, Link } from '@navikt/ds-react';
import _ from 'lodash';
import styles from './CreateReport.module.css';
import { formatDate } from '@src/utils/client/date';

interface CreateReportProps {
  report: Report | AggregatedReport;
  reportType: 'SINGLE' | 'AGGREGATED';
}

const CreateReport = ({ report, reportType }: CreateReportProps) => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>([]);
  const [activeTab, setActiveTab] = useState('criteria');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions: Record<string, string> = {
    COMPLIANT: 'Tilfredsstilt',
    NON_COMPLIANT: 'Ikke tilfredsstilt',
    NOT_TESTED: 'Ikke testet',
    NOT_APPLICABLE: 'Ikke aktuelt',
  };

  const updateReportData = async (
    updates: Partial<Report> | Partial<AggregatedReport>,
  ) => {
    try {
      reportType === 'SINGLE'
        ? await updateReport(report.reportId, updates)
        : await updateAggregatedReport(report.reportId, updates);
      console.log('Report updated');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriterionChange = _.debounce(
    (WCAGId: string, fieldToUpdate: string, updatedData: string) => {
      setCriteriaData((prev) => {
        const index = prev.findIndex(
          (criterion) => criterion.number === WCAGId,
        );
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
    },
    500,
  );

  const handleMetadataChange = _.debounce(
    (fieldToUpdate: string, updatedData: string) => {
      updateReportData({ [fieldToUpdate]: updatedData });
    },
    500,
  );

  useEffect(() => {
    if (report) {
      setCriteriaData(report.successCriteria);
    }
  }, [report]);

  console.log('report', report);
  return (
    <div className={styles.reportContent}>
      <Heading level="1" size="xlarge">
        {report?.descriptiveName}
      </Heading>
      <Tabs value={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <Tabs.List>
          <Tabs.Tab value="criteria" label="Retningslinjer" />
          <Tabs.Tab value="metadata" label="Metadata" />
        </Tabs.List>

        <Tabs.Panel value="criteria" className={styles.tabContent}>
          <Chips className={styles.reportFilters}>
            {Object.keys(filterOptions).map((option) => (
              <Chips.Toggle
                key={option}
                selected={selectedFilters.includes(option)}
                onClick={() => {
                  setSelectedFilters((prev) =>
                    prev.includes(option)
                      ? prev.filter((filter) => filter !== option)
                      : [...prev, option],
                  );
                }}
              >
                {filterOptions[option]}
              </Chips.Toggle>
            ))}
          </Chips>
          {reportType === 'AGGREGATED' && (
            <Link href={`/admin/create-reports/${report?.reportId}`}>
              Bruk som mal
            </Link>
          )}
          <section>
            {report?.created && <p>Opprettet: {formatDate(report?.created)}</p>}
            <p>Opprettet av: {report?.author.email}</p>
            {report?.lastChanged && (
              <p>Sist endret: {formatDate(report?.lastChanged)}</p>
            )}
            <p>Sist endret av: {report?.lastUpdatedBy}</p>
          </section>
          <ul className={styles.criteriaList}>
            {selectedFilters.length === 0
              ? criteriaData.map((criterion) => (
                  <li key={criterion.number}>
                    <Criterion
                      key={criterion.number}
                      criterion={criterion}
                      handleChange={handleCriterionChange}
                      hasWriteAccess={report?.hasWriteAccess as boolean}
                    />
                  </li>
                ))
              : criteriaData
                  .filter((criterion) =>
                    selectedFilters.includes(criterion.status),
                  )
                  .map((criterion) => (
                    <li key={criterion.number}>
                      <Criterion
                        key={criterion.number}
                        criterion={criterion}
                        handleChange={handleCriterionChange}
                        hasWriteAccess={report?.hasWriteAccess as boolean}
                      />
                    </li>
                  ))}
          </ul>
        </Tabs.Panel>
        <Tabs.Panel value="metadata" className={styles.tabContent}>
          <TextField
            label="Rapportnavn"
            id="report-name"
            name="report-name"
            defaultValue={report?.descriptiveName}
            readOnly={!report?.hasWriteAccess}
            onChange={(e) =>
              handleMetadataChange('descriptiveName', e.target.value)
            }
          />
          <TextField
            label="URL"
            id="report-url"
            name="report-url"
            defaultValue={report?.url}
            readOnly={!report?.hasWriteAccess}
            onChange={(e) => handleMetadataChange('url', e.target.value)}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default CreateReport;
