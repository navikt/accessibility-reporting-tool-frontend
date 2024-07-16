import { useState, useEffect } from 'react';
import Criterion from './criterion/Criterion';
import type { CriterionType, Report } from '@src/types';
import { getReport } from '@src/services/reportServices';
import useSWR from 'swr';

const CreateReport = ({ id }: string) => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>([]);
  const { data: report, isLoading } = useSWR<Report>(
    `/reports/${id}`,
    getReport,
  );
  console.log;
  const handleCriterionChange = (WCAGId: string, updatedData: string) => {
    console.log('******', updatedData);
    setCriteriaData((prev) => {
      const index = prev.findIndex((criterion) => criterion.number === WCAGId);
      console.log('index', index);
      console.log('prev', prev);

      if (index !== -1) {
        // Clone the array for immutability
        const newCriteriaData = [...prev];
        // Merge filtered updated data with the existing criterion data
        newCriteriaData[index] = {
          ...newCriteriaData[index],
          status: updatedData,
        };
        console.log(newCriteriaData);
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
      <form>
        <label htmlFor="report-name">
          Rapportnavn
          <input
            type="text"
            id="report-name"
            name="report-name"
            defaultValue={report?.descriptiveName}
          />
        </label>
        <label htmlFor="report-url">
          URL
          <input type="text" id="report-url" name="report-url" />
        </label>
        {criteriaData?.map((criterion: CriterionType) => (
          <Criterion
            key={criterion.number}
            criterion={criterion}
            handleChange={(e) => handleCriterionChange(criterion.number, e)}
          />
        ))}
        <button type="submit">Opprett Rapport</button>
      </form>
    </div>
  );
};

export default CreateReport;
