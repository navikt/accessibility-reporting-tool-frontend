import { useRef, useState } from 'react';
import { Button, Modal, Select, TextField } from '@navikt/ds-react';
import { createReport } from '@src/services/reportServices';
import { FilePlusIcon } from '@navikt/aksel-icons';

const CreateReportModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [reportDetails, setReportDetails] = useState({
    title: '',
    url: '',
    team: '',
  });
  const handleSubmit = () => {
    const reportId = createReport(
      reportDetails.title,
      reportDetails.url,
      reportDetails.team,
    );
    console.log(reportId);
    ref.current?.close();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setReportDetails({
      ...reportDetails,
      [e.target.name]: e.target.value,
    });
    console.log(reportDetails);
  };

  return (
    <div>
      <Button
        type="button"
        icon={<FilePlusIcon />}
        onClick={() => {
          ref.current?.showModal();
          console.log('Modal opened');
        }}
      >
        Opprett en ny rapport
      </Button>
      <Modal ref={ref} header={{ heading: 'Opprett rapport' }}>
        <Modal.Body>
          <TextField
            label="Tittel"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
          />
          <TextField
            label="URL"
            type="text"
            id="url"
            name="url"
            onChange={handleChange}
          />
          <Select
            label="Hilket team er ansvarlig for løsningen?"
            name="team"
            onChange={handleChange}
          >
            <option value="">Velg land</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={handleSubmit}>
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
