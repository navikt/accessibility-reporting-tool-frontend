import {useRef, useState} from "react";
import { Button, Modal, TextField } from "@navikt/ds-react";
import AddOrgBtn from "@components/buttons/AddOrgBtn.tsx";

const ModalElement = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const [members, setMembers] = useState<string[]>([]);

    const addMemberField = () => {
        setMembers([...members, ""]);
    };

    return (
        <div className="py-12">
            <AddOrgBtn onClick={() => ref.current?.showModal()} />

            <Modal ref={ref} header={{ heading: "Legg Til Organisasjonsenhet" }} width={400}>
                <Modal.Body>
                    <form method="dialog" id="skjema" onSubmit={() => alert("onSubmit")}>
                        <TextField label="Skriv inn navnet på teamet ditt." />
                        <TextField label="Skriv inn din epost." />
                        {members.map((_, index) => (
                            <TextField
                                key={index}
                                label={`Medlem ${index + 1}`}
                                value={members[index]}
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