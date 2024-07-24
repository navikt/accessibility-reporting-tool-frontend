import { useEffect, useRef, useState } from 'react';
import { Button, List, Modal, TextField } from '@navikt/ds-react';
import { apiUrl } from '@src/urls';
import { PersonPencilIcon, XMarkIcon } from '@navikt/aksel-icons';
import styles from './EditTeamModal.module.css';

interface ModalElementProps {
  onAddTeam?: (newTeam: Team) => void;
}

type Team = {
  id: string;
  name: string;
  email: string;
  members: string[];
};

interface EditTeamModalProps {
  team: Team;
}

function EditTeamModal(props: EditTeamModalProps) {
  let team = props.team;
  const ref = useRef<HTMLDialogElement>(null);
  const [teamEmail, setTeamEmail] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [currentMembers, setCurrentMembers] = useState<string[]>([]);

  const addMemberField = () => {
    setMembers(['']);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', teamEmail);
    console.log('Members:', members);

    const editedTeam: Team = {
      id: team.id,
      name: team.name,
      email: teamEmail,
      members: members,
    };

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
      setMembers(['']);
      ref.current?.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setCurrentMembers(props.team?.members);
  });

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
              label="Sett ny emailadresse for teameier"
              defaultValue={team?.email}
              onChange={(e) => setTeamEmail(e.target.value)}
            />

            <List className={styles.currentMembersList}>
              {currentMembers?.map((member: string) => {
                return (
                  <List.Item
                    key={member}
                    icon={<XMarkIcon />}
                    className={styles.currentMembersListItem}
                  >
                    Fjern {member}
                  </List.Item>
                );
              })}
            </List>
            {members?.map((member, index) => (
              <TextField
                key={index}
                label={`Nytt medlem`}
                onChange={(e) => {
                  const newMembers = [...members];
                  newMembers[index] = e.target.value;
                  setMembers(newMembers);
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
            /*onClick={() => {
                            ref.current?.close();
                        }}*/
          >
            Lagre
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              setTeamEmail('');
              setMembers([]);
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
