import { apiProxyUrl } from '@src/urls.client.ts';
import type { Report } from '@src/types';

export const createReport = async (
  title: string,
  url: string,
  teamId: string,
) => {
  const response = await fetch(`${apiProxyUrl}/reports/new`, {
    method: 'POST',
    body: JSON.stringify({ title, url, teamId }),
    credentials: 'include',
  });

  if (response.ok) {
    const report = await response.json();
    console.log('Report created', report, response.status);
    window.location.href = `/reports/${report.id}`;
  } else {
    console.log('Failed to create report', response.status);
    throw new Error('Failed to create report');
  }
};

export const getReport = async (url: string): Promise<Report> => {
  const response = await fetch(`${apiProxyUrl}${url}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    const report = await response.json();
    return report;
  } else {
    console.log('Failed to fetch report', response.status);
    throw new Error('Failed to fetch report');
  }
};
