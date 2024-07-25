import { useRef, useState } from 'react';
import { Button, Modal, Select, TextField } from '@navikt/ds-react';
import { createReport } from '@src/services/reportServices';
import { FilePlusIcon } from '@navikt/aksel-icons';
import { fetcher } from '@src/utils/api.client';
import useSWRImmutable from 'swr/immutable';
import { apiUrl } from '@src/urls';
import type { InitialReport, Team } from '@src/types';

const CreateReportModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [reportDetails, setReportDetails] = useState<InitialReport>({
    name: '',
    urlTilSiden: '',
    teamId: '',
  });
  const handleSubmit = () => {
    const reportId = createReport(reportDetails);
    console.log(reportId);
    ref.current?.close();
  };

  const { data: userDetails, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/users/details` },
    fetcher,
  );

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
            name="name"
            onChange={handleChange}
          />
          <TextField
            label="URL"
            type="text"
            id="url"
            name="urlTilSiden"
            onChange={handleChange}
          />
          <Select
            label="Hilket team er ansvarlig for løsningen?"
            name="teamId"
            onChange={handleChange}
          >
            <option value="">Velg team</option>
            {userDetails?.teams.map((team: Team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
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
