import { useEffect, useRef, useState } from 'react';
import { Button, List, Modal, TextField } from '@navikt/ds-react';
import { PersonPencilIcon, XMarkIcon } from '@navikt/aksel-icons';
import styles from './EditTeamModal.module.css';
import type { Team } from '@src/types.ts';
import { updateTeam } from '@src/services/teamServices';
import useSWR from 'swr';
import { fetcher } from '@src/utils/client/api.ts';
import { apiProxyUrl } from '@src/utils/client/urls.ts';

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
    setNewMembers([...newMembers, '']);
  };

  const {
    data: teamData,
    isLoading: isLoadingTeamData,
    mutate,
  } = useSWR({ url: `${apiProxyUrl}/teams/${props.teamId}` }, fetcher);

  const updateTeamData = async () => {
    const editedTeam: Team = {
      id: teamData.id,
      name: teamName,
      email: teamEmail,
      members: [...currentMembers, ...newMembers],
    };

    console.log(editedTeam);

    try {
      await updateTeam(props.teamId as string, editedTeam);
      ref.current?.close();
      console.log('her her her');
      mutate();
      setCurrentMembers(editedTeam.members);
      setNewMembers([]);
    } catch (error) {
      console.error(error);
      setCurrentMembers(editedTeam.members); //Denne linja og linja under må fjernes/endres før deployment
      setNewMembers([]);
    }
  };

  useEffect(() => {
    setTeamEmail(teamData?.email);
    setCurrentMembers(teamData?.members);
    setTeamName(teamData?.name);
  }, [teamData]);

  const isValid = teamName && teamEmail;

  return (
    <div className="py-12">
      <Button
        variant="secondary"
        onClick={() => ref.current?.showModal()}
        icon={<PersonPencilIcon />}
      >
        Rediger
      </Button>

      <Modal
        ref={ref}
        header={{ heading: 'Rediger team' }}
        width={400}
        closeOnBackdropClick={true}
      >
        <Modal.Body>
          <span className={styles.modalFields}>
            <TextField
              label="Sett navn for team"
              defaultValue={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            <TextField
              label="Sett emailadresse for teameier"
              defaultValue={teamEmail}
              type="email"
              onChange={(e) => setTeamEmail(e.target.value)}
            />

            <List className={styles.currentMembersList}>
              {currentMembers?.map((member: string) => {
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
                type="email"
                placeholder="ola.nordmann@nav.no"
                onChange={(e) => {
                  const newGuys = [...newMembers];
                  newGuys[index] = e.target.value;
                  setNewMembers(newGuys);
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
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateTeamData} disabled={!isValid}>
            Lagre
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
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
