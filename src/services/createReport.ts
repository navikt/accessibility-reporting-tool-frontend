import { apiUrl } from '@src/urls';
import useSWR from 'swr';

export const InitializeReport = (title: string, url: string) => {
  const createReport = async () => {
    const response = await fetch(`${apiUrl}/reports/new`, {
      method: 'POST',
      body: JSON.stringify({ title, url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const report = await response.json();
      console.log('Report created', report, response.status);
      return report;
    } else {
      console.log('Failed to create report', response.status);
      throw new Error('Failed to create report');
    }
  };

  const { data, mutate } = useSWR('createReport', createReport);
  console.log(mutate);
  return {
    createReport: mutate,
    report: data,
  };
};
