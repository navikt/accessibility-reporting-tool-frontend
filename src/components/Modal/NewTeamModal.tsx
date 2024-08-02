import { useRef, useState } from 'react';
import { Button, Modal, TextField } from '@navikt/ds-react';
import AddOrgBtn from '@components/buttons/AddOrgBtn.tsx';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import type { NewTeam } from '@src/types';
import { createNewTeam } from '@src/services/teamServices';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/client/api';

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
      setTeamName('');
      setTeamEmail('');
      setMembers(['']);
      ref.current?.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="py-12">
      <AddOrgBtn onClick={() => ref.current?.showModal()} />

      <Modal ref={ref} header={{ heading: 'Legg til team' }} width={400}>
        <Modal.Body>
          <form id="teamForm" onSubmit={handleSubmit}>
            <TextField
              label="Teamnavn"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Eksempel"
            />
            <TextField
              label="Skriv inn din e-post:"
              value={teamEmail}
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
          <Button
            type="submit"
            form="teamForm"
            onClick={() => {
              ref.current?.close();
            }}
          >
            Send
          </Button>
          <Button
            type="button"
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
