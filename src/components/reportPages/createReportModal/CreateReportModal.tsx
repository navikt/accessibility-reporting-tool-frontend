import { useRef } from 'react';
import { BodyLong, Button, Heading, Modal, TextField } from '@navikt/ds-react';

const CreateReportModal = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: 'Opprett rapport' }}>
        <Modal.Body>
          <form>
            <TextField
              label="Tittel"
              type="text"
              id="report-title"
              name="report-title"
            />
            <TextField
              label="URL"
              type="text"
              id="report-url"
              name="report-url"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Oprett rapport
          </Button>
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

export default CreateReportModal;
