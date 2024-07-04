import React, { useState } from "react";
import { Link } from '@navikt/ds-react';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/api.client.ts';
import styles from './TeamListe.module.css';
import ModalElement from "@components/Modal/Modal.tsx";

interface Team {
  navn: string;
  url: string;
  email: string;
  members?: string[];
}

const TeamListe = () => {
  const { data, isLoading, mutate } = useSWRImmutable(
      { url: 'http://localhost:8787/teams' },
      fetcher,
  );
  const [newTeams, setNewTeams] = useState<Team[]>([]);

  const handleAddTeam = (newTeam: Team) => {
    setNewTeams([...newTeams, newTeam]);
    mutate([...data, newTeam], false);
  };

  if (isLoading) {
    return null;
  }

  return (
      <div>
          <div className={styles.TeamListeContainer}>
        <ModalElement onAddTeam={handleAddTeam} />
          </div>
        <ul className={styles.list}>
          {data.map((team: Team) => (
              <li key={team.navn} className={styles.listItem}>
                <Link href={team.url} variant="neutral">
                  {team.navn}
                </Link>
              </li>
          ))}
          {newTeams.map((team: Team) => (
              <li key={team.navn} className={styles.listItem}>
                <Link href={team.url} variant="neutral">
                  {team.navn}
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TeamListe;
