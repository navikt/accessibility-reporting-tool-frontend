import { useRef } from 'react';
import { Button, Modal, TextField } from '@navikt/ds-react';
import AddOrgBtn from '@components/buttons/AddOrgBtn.tsx';
import {useRef, useState} from "react";
import {Button, Modal, TextField} from "@navikt/ds-react";
import AddOrgBtn from "@components/buttons/AddOrgBtn.tsx";

const ModalElement = () => {
  const ref = useRef<HTMLDialogElement>(null);
interface ModalElementProps {
    onAddTeam?: (newTeam: Team) => void;
}

interface Team {
    navn: string;
    url: string;
    email: string;
    members?: string[];
}

const ModalElement: React.FC<ModalElementProps> = ({onAddTeam}) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [teamName, setTeamName] = useState("");
    const [teamEmail, setTeamEmail] = useState("");
    const [members, setMembers] = useState<string[]>([""]);

    const addMemberField = () => {
        setMembers([...members, ""]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Team Name:", teamName);
        console.log("Email:", teamEmail);
        console.log("Members:", members);

        const urlFriendlyName = teamName.toLowerCase().replace(/\s+/g, '-');
        const newTeam: Team = {
            navn: teamName,
            url: `/team/${urlFriendlyName}`,
            email: teamEmail,
            members: members.filter(member => member)
        };

        try {
            const response = await fetch('http://localhost:8787/teams/new', {
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


            setTeamName("");
            setTeamEmail("");
            setMembers([""]);
            ref.current?.close();
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className="py-12">
      <AddOrgBtn onClick={() => ref.current?.showModal()} />

      <Modal ref={ref} header={{ heading: 'Skjema' }} width={400}>
        <Modal.Body>
          <form method="dialog" id="skjema" onSubmit={() => alert('onSubmit')}>
            <TextField label="Har du noen tilbakemeldinger?" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="skjema">Send</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalElement;
