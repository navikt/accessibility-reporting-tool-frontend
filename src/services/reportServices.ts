import type { Report, InitialReport } from '@src/types.ts';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import { getOboToken } from '@src/utils/server/getOboToken';
import { apiUrl } from '@src/utils/server/urls.ts';

const oboToken = getOboToken;

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
  const response = await fetch(`${apiProxyUrl}/reports/${id}/update`, {
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

export const getAstroReport = async (id: string): Promise<Report> => {
  const response = await fetch(`${apiUrl}/api/reports/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${oboToken}`,
    },
    // @ts-expect-error - This is a valid option
    duplex: 'half',
  });

  if (response.ok) {
    const report = await response.json();
    return report;
  } else {
    console.log('Failed to fetch report', response.status);
    throw new Error('Failed to fetch report');
  }
};
