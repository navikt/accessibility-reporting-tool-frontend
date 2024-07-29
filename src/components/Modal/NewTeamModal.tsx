import { useRef, useState } from 'react';
import { Button, Modal, TextField } from '@navikt/ds-react';
import AddOrgBtn from '@components/buttons/AddOrgBtn.tsx';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';

interface ModalElementProps {
  onAddTeam?: (newTeam: Team) => void;
}

interface Team {
  id: string;
  name: string;
  //url: string
  email: string;
  members?: string[];
}

const NewTeamModal: React.FC<ModalElementProps> = ({ onAddTeam }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [members, setMembers] = useState<string[]>(['']);

  const addMemberField = () => {
    setMembers([...members, '']);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Team Name:', teamName);
    console.log('Email:', teamEmail);
    console.log('Members:', members);

    const urlFriendlyName = teamName.toLowerCase().replace(/\s+/g, '-');
    const newTeam: Team = {
      id: teamName + teamName.length, //lol dette får endres
      name: teamName,
      //url: `/team/${urlFriendlyName}`,
      email: teamEmail,
      members: members.filter((member) => member),
    };

    try {
      const response = await fetch(`${apiProxyUrl}/teams/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      const responseData = await response.json();
      console.log('Created Team:', responseData.team);
      if (onAddTeam) {
        onAddTeam(responseData.team);
      }

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

      <Modal
        ref={ref}
        header={{ heading: 'Legg Til Organisasjonsenhet' }}
        width={400}
      >
        <Modal.Body>
          <form id="teamForm" onSubmit={handleSubmit}>
            <TextField
              label="Skriv inn navnet på teamet ditt."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <TextField
              label="Skriv inn din epost."
              value={teamEmail}
              onChange={(e) => setTeamEmail(e.target.value)}
            />

            {members.map((member, index) => (
              <TextField
                key={index}
                label={`Medlem ${index + 1}`}
                value={member}
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
};

export default NewTeamModal;
