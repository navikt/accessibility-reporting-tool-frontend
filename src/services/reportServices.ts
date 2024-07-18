import { apiUrl } from '@src/urls';
import type { Report } from '@src/types';

export const createReport = async (
  title: string,
  url: string,
  teamId: string,
) => {
  const response = await fetch(`${apiUrl}/reports/new`, {
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
  const response = await fetch(`${apiUrl}${url}`, {
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

export const updateReport = async (id: string, updatedReport: Report) => {
  const response = await fetch(`${apiUrl}/reports/${id}`, {
    method: 'POST',
    body: JSON.stringify(updatedReport),
    credentials: 'include',
  });
  if (response.ok) {
    console.log('Report updated', response.status);
  } else {
    console.log('Failed to update report', response.status);
    throw new Error('Failed to update report');
  }
};
