import { useState } from 'react';
import Criterion from './criterion/Criterion';
import type { CriterionType } from '@src/types';
import { apiUrl } from '@src/urls';
import { fetcher } from '@src/utils/api.client';
import useSWRImmutable from 'swr/immutable';
import { InitializeReport } from '@src/services/createReport';

const CreateReport = () => {
  const [criteriaData, setCriteriaData] = useState<CriterionType[]>([]);

  const newReport = InitializeReport('title', 'url');
  console.log(newReport);
  const handleCriterionChange = (WCAGId: string, updatedData: string) => {
    console.log('******', updatedData);
    setCriteriaData((prev) => {
      const index = prev.findIndex((criterion) => criterion.WCAGId === WCAGId);
      console.log('index', index);
      console.log('prev', prev);

      if (index !== -1) {
        // Clone the array for immutability
        const newCriteriaData = [...prev];
        // Merge filtered updated data with the existing criterion data
        newCriteriaData[index] = {
          ...newCriteriaData[index],
          state: updatedData,
        };
        console.log(newCriteriaData);
        return newCriteriaData;
      }
      return prev;
    });
  };

  const { data, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/criteria` },
    fetcher,
  );

  if (!isLoading && criteriaData.length === 0) {
    setCriteriaData(data);
  }

  return (
    <div>
      <form>
        <label htmlFor="report-name">
          Rapportnavn
          <input type="text" id="report-name" name="report-name" />
        </label>
        <label htmlFor="report-url">
          URL
          <input type="text" id="report-url" name="report-url" />
        </label>
        {criteriaData?.map((criterion: CriterionType) => (
          <Criterion
            key={criterion.WCAGId}
            criterion={criterion}
            handleChange={(e) => handleCriterionChange(criterion.WCAGId, e)}
          />
        ))}
        <button type="submit">Opprett Rapport</button>
      </form>
    </div>
  );
};

export default CreateReport;
