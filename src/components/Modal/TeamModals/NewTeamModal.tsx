import { useEffect, useRef, useState } from 'react';
import { Button, Modal, TextField } from '@navikt/ds-react';
import AddOrgBtn from '@components/buttons/AddOrgBtn.tsx';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import type { NewTeam } from '@src/types';
import { createNewTeam } from '@src/services/teamServices';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/client/api';
import styles from '../Modal.module.css';
import useSWR from 'swr';

{
  /*
interface ModalElementProps {
  onAddTeam?: (newTeam: NewTeam) => void;
}
*/
}

function NewTeamModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [members, setMembers] = useState<string[]>(['']);

  const { data: userDetails, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  const { mutate } = useSWR({ url: `${apiProxyUrl}/teams` }, fetcher);

  const addMemberField = () => {
    setMembers([...members, '']);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTeam: NewTeam = {
      name: teamName,
      email: teamEmail,
      members: members,
    };

    console.log(newTeam);

    try {
      await createNewTeam(newTeam);
      mutate();
      setTeamName('');
      setTeamEmail('');
      setMembers(['']);
      ref.current?.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isValid = teamName && teamEmail;

  useEffect(() => {
    setTeamEmail(userDetails?.email);
  }, [isLoading]);

  return (
    <div className="py-12">
      <AddOrgBtn onClick={() => ref.current?.showModal()} />

      <Modal
        ref={ref}
        header={{ heading: 'Legg til team' }}
        width={400}
        closeOnBackdropClick={true}
      >
        <Modal.Body className={styles.modalBody}>
          <form
            id="createTeamForm"
            onSubmit={handleSubmit}
            className={styles.modalFields}
          >
            <TextField
              label="Teamnavn"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Eksempel"
            />
            <TextField
              label="Skriv inn din e-post:"
              onChange={(e) => setTeamEmail(e.target.value)}
              placeholder="ola.nordmann@nav.no"
              defaultValue={userDetails?.email}
            />

            {members.map((member, index) => (
              <TextField
                key={index}
                label={`Medlem ${index + 1}`}
                value={member}
                placeholder="ola.nordmann@nav.no"
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
              Legg til flere medlemmer
            </a>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="createTeamForm" disabled={!isValid}>
            Send
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setTeamName('');
              setTeamEmail('');
              setMembers(['']);
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

export default NewTeamModal;
