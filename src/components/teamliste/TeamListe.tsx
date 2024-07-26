import { Link } from '@navikt/ds-react';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/api.client.ts';
import styles from './TeamListe.module.css';
import ModalElement from '@components/Modal/NewTeamModal';
import NewTeamModal from '@components/Modal/NewTeamModal';
import { apiProxyUrl } from '@src/urls.client.ts';

interface Team {
  id: string;
  name: string;
  //url: string;
  email: string;
  members?: string[];
}

const TeamListe = () => {
  const { data, isLoading, mutate } = useSWRImmutable(
    { url: `${apiProxyUrl}/teams` },
    fetcher,
  );
  console.log(data);
  const handleAddTeam = async (newTeam: Team) => {
    try {
      mutate((currentData: Team[] | undefined) => {
        if (!currentData) return [newTeam];
        return [...currentData, newTeam];
      }, false);
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <NewTeamModal onAddTeam={handleAddTeam} />
      <ul className={styles.list}>
        {data.map((team: Team) => {
          return (
            <li key={team.id} className={styles.listItem}>
              <Link href={`/team/${team.id}`} variant="neutral">
                {team.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TeamListe;
