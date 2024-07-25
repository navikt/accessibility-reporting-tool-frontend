import { useEffect, useRef, useState } from 'react';
import { Button, List, Modal, TextField } from '@navikt/ds-react';
import { apiUrl } from '@src/urls';
import { PersonPencilIcon, XMarkIcon } from '@navikt/aksel-icons';
import styles from './EditTeamModal.module.css';
import type { Team } from '@src/types';
import { updateTeam } from '@src/services/teamServices';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@src/utils/api.client';

interface ModalElementProps {
  onAddTeam?: (newTeam: Team) => void;
}

interface EditTeamModalProps {
  teamId: string;
}

function EditTeamModal(props: EditTeamModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [teamEmail, setTeamEmail] = useState('');
  const [newMembers, setNewMembers] = useState<string[]>([]);
  const [currentMembers, setCurrentMembers] = useState<string[]>([]);
  const [teamName, setTeamName] = useState('');

  const addMemberField = () => {
    setNewMembers(['']);
  };

  const {
    data: teamData,
    isLoading: isLoadingTeamData,
    mutate,
  } = useSWR({ url: `${apiUrl}/teams/${props.teamId}/details` }, fetcher);

  const updateTeamData = async (updates: Team) => {
    try {
      await updateTeam(props.teamId as string, updates);
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', teamEmail);
    console.log('Members:', currentMembers);

    const editedTeam: Team = {
      id: teamData.id,
      name: teamData.id,
      email: teamEmail,
      members: currentMembers,
    };

    {
      /*
    try {
      const response = await fetch(`${apiUrl}/teams/editTeam/${team.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTeam),
      });

      if (!response.ok) {
        throw new Error('Failed to edit team');
      }

      const responseData = await response.json();
      console.log('Edited Team:', responseData.team);

      setTeamEmail('');
      setNewMembers(['']);
      ref.current?.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };
*/
    }
  };
  useEffect(() => {
    setCurrentMembers(teamData?.members);
    setTeamName(teamData?.name);
  }, []);

  return (
    <div className="py-12">
      <Button
        variant="secondary"
        onClick={() => ref.current?.showModal()}
        icon={<PersonPencilIcon />}
      >
        Rediger
      </Button>

      <Modal ref={ref} header={{ heading: 'Rediger team' }} width={400}>
        <Modal.Body>
          <form id="teamForm" onSubmit={handleSubmit}>
            <TextField
              label="Sett navn for team"
              defaultValue={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            <TextField
              label="Sett emailadresse for teameier"
              defaultValue={teamData?.email}
              onChange={(e) => setTeamEmail(e.target.value)}
            />

            <List className={styles.currentMembersList}>
              {currentMembers?.map((member: string, index) => {
                return (
                  <List.Item
                    key={member}
                    icon={<XMarkIcon />}
                    className={styles.currentMembersListItem}
                    onClick={() => {
                      let membersCopy = [...currentMembers];
                      let index = membersCopy.indexOf(member);
                      console.log(membersCopy, '********1111');
                      membersCopy.splice(index, 1);
                      console.log(membersCopy, '*********2222');
                      setCurrentMembers(membersCopy);

                      console.log(membersCopy);
                    }}
                  >
                    Fjern {member}
                  </List.Item>
                );
              })}
            </List>
            {newMembers?.map((member, index) => (
              <TextField
                key={index}
                label={`Mailadresse til nytt medlem`}
                placeholder="ola.nordmann@nav.no"
                onChange={(e) => {
                  const newGuys = [...newMembers];
                  newGuys[index] = e.target.value;
                  setNewMembers(newMembers);
                }}
              />
            ))}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                addMemberField();
              }}
              style={{ display: 'block', marginTop: '1rem' }}
            >
              Legg til medlem
            </a>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            form="teamForm"
            onClick={() => {
              updateTeamData;
              ref.current?.close();
            }}
          >
            Lagre
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              setTeamEmail('');
              setNewMembers([]);
              ref.current?.close();
            }}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTeamModal;
