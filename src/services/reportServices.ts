
import type { Report, InitialReport } from '@src/types';
import { apiProxyUrl } from '@src/urls.client.ts';

export const createReport = async (initReport: InitialReport) => {
  const response = await fetch(`${apiProxyUrl}/reports/new`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(initReport),
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

export const updateReport = async (id: string, updates: Partial<Report>) => {
  const response = await fetch(`${apiProxyUrl}/reports/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
    credentials: 'include',
  });
  if (response.ok) {
    console.log('Report updated', response.status);
  } else {
    console.log('Failed to update report-', response.status);
    throw new Error('Failed to update report');
  }
};
