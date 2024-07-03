import { useRef } from 'react';
import { Button, Modal, TextField } from '@navikt/ds-react';
import AddOrgBtn from '@components/buttons/AddOrgBtn.tsx';

const ModalElement = () => {
  const ref = useRef<HTMLDialogElement>(null);

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
