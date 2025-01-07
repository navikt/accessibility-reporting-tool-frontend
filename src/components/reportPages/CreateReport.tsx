import { useState, useEffect } from 'react';
import Criterion from './criterion/Criterion';
import type { AggregatedReport, CriterionType, Report } from '@src/types.ts';
import {
  updateAggregatedReport,
  updateReport,
} from '@src/services/reportServices';
import {
  Tabs,
  TextField,
  Textarea,
  Chips,
  Heading,
  Link,
  Button,
  Checkbox,
} from '@navikt/ds-react';
import _, { set } from 'lodash';
import styles from './CreateReport.module.css';
import { formatDate } from '@src/utils/client/date';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import DeleteReportModal from '@components/Modal/deleteReportModal/DeleteReportModal';

interface CreateReportProps {
  report: Report | AggregatedReport;
  reportType: 'SINGLE' | 'AGGREGATED';
  isAdmin: boolean;
}

const CreateReport = ({ report, reportType, isAdmin }: CreateReportProps) => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>(
    report.successCriteria,
  );
  const [activeTab, setActiveTab] = useState('criteria');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isPartOfNavNo, setIsPartOfNavNo] = useState<boolean>(
    report.isPartOfNavNo,
  );

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

  const handleCheckboxChange = () => {
    setIsPartOfNavNo((prev) => {
      const newValue = !prev;
      updateReportData({ isPartOfNavNo: newValue });
      return newValue;
    });
  };

  return (
    <div className={styles.reportContent}>
      <Heading level="1" size="xlarge">
        {report?.descriptiveName}
      </Heading>
      <Tabs value={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <div className={styles.tabListButton}>
          <Tabs.List>
            <Tabs.Tab value="criteria" label="Retningslinjer" />
            <Tabs.Tab value="metadata" label="Metadata" />
          </Tabs.List>
          {isAdmin && <DeleteReportModal reportId={report.reportId} />}
        </div>

        <Tabs.Panel value="criteria" className={styles.tabContent}>
          <span className={styles.filtersAndButton}>
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
              <Button
                as={Link}
                variant="secondary"
                href={`/admin/create-report/${report?.reportId}`}
                underline={false}
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Bruk som mal
              </Button>
            )}
          </span>
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
          <section className={styles.metadata}>
            {report?.created && <p>Opprettet: {formatDate(report?.created)}</p>}
            <p>Opprettet av: {report?.author.email}</p>
            {report?.lastChanged && (
              <p>Sist endret: {formatDate(report?.lastChanged)}</p>
            )}
            <p>Sist endret av: {report?.lastUpdatedBy}</p>
          </section>
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
          <Textarea
            label="Notater"
            id="notes"
            name="notes"
            defaultValue={report?.notes}
            readOnly={!report?.hasWriteAccess}
            onChange={(e) => handleMetadataChange('notes', e.target.value)}
          />
          {reportType === 'SINGLE' && (
            <Checkbox
              description="Hvis rapporten er for en applikasjon som er en del av NAV.no rettet mot eksterne brukere, huk av her."
              name="isPartOfNavNo"
              defaultChecked={isPartOfNavNo}
              onChange={handleCheckboxChange}
              readOnly={!report?.hasWriteAccess}
            >
              Tjenesten er under NAV.no
            </Checkbox>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default CreateReport;
