import type { Team } from '@src/types.ts';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';

export const updateTeam = async (teamId: string, updates: Team) => {
  const response = await fetch(`${apiProxyUrl}/team/${teamId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
    credentials: 'include',
  });
  if (response.ok) {
    console.log('Team updated', response.status);
  } else {
    console.log('Failed to update team-', response.status);
    throw new Error('Failed to update team');
  }
};
