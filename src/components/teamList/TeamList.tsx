import { Link, Table, Button } from '@navikt/ds-react';
import styles from './TeamList.module.css';
import type { Team } from '@src/types';
import EditTeamModal from '@components/Modal/TeamModals/EditTeamModal';
import DeleteTeamModal from '@components/Modal/deleteTeam/DeleteTeamModal';

interface TeamListProps {
  teams: Team[];
  isAdmin: boolean;
}

const TeamList = ({ teams, isAdmin }: TeamListProps) => {
  console.log(teams);
  return (
    <section className={styles.wrapper}>
      {isAdmin ? (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>Redigere team</Table.HeaderCell>
              <Table.HeaderCell>Slette team</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {teams.map((team: Team) => {
              return (
                <Table.Row key={team.id}>
                  <Table.HeaderCell scope="row">
                    <Link href={`/teams/${team.id}`} variant="neutral">
                      {team.name}
                    </Link>
                  </Table.HeaderCell>
                  <Table.DataCell>
                    <EditTeamModal teamId={team.id} />
                  </Table.DataCell>
                  <Table.DataCell>
                    <DeleteTeamModal teamId={team.id} />
                  </Table.DataCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <ul className={styles.list}>
          {teams.map((team: Team) => {
            return (
              <li key={team.id} className={styles.listItem}>
                <Link href={`/teams/${team.id}`} variant="neutral">
                  {team.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default TeamList;
