import type { NewTeam, Team } from '@src/types.ts';
import { apiProxyUrl } from '@src/utils/client/urls.ts';

export const updateTeam = async (teamId: string, updates: Team) => {
  const response = await fetch(`${apiProxyUrl}/teams/${teamId}/update`, {
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

export const createNewTeam = async (newTeam: NewTeam) => {
  console.log(newTeam);
  const response = await fetch(`${apiProxyUrl}/teams/new`, {
    method: 'POST',
    body: JSON.stringify(newTeam),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log(
      `${newTeam.name} Created! The members are: ${newTeam.members}`, //Rediger senere. Brukte til debugging
      response.status,
    );
  }

  if (!response.ok) {
    throw new Error('Failed to create team');
  }
};
