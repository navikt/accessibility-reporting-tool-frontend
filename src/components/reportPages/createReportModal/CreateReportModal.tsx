import { useRef, useState } from 'react';
import {
  Button,
  Dropdown,
  Link,
  Modal,
  Select,
  TextField,
} from '@navikt/ds-react';

const CreateReportModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [reportDetails, setReportDetails] = useState({
    title: '',
    url: '',
    team: '',
  });
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          ref.current?.showModal();
          console.log('Modal opened');
        }}
      >
        Opprett en ny erklæring
      </Button>
      <Modal ref={ref} header={{ heading: 'Opprett rapport' }}>
        <Modal.Body>
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
          <Select label="Hilket team er ansvarlig for løsningen?">
            <option value="">Velg land</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref?.current?.close()}>
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
