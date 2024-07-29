import type { Team } from '@src/types';
import { apiUrl } from '@src/urls';

export const updateTeam = async (teamId: string, updates: Team) => {
  const response = await fetch(`${apiUrl}/team/${teamId}`, {
    method: 'PUT',
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
