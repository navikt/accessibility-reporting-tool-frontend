import { useRef, useState } from 'react';
import { Button, Modal, Select, TextField } from '@navikt/ds-react';
import { createReport } from '@src/services/reportServices';
import { FilePlusIcon } from '@navikt/aksel-icons';
import { fetcher } from '@src/utils/clientUtils/api.ts';
import useSWRImmutable from 'swr/immutable';
import type { InitialReport, Team } from '@src/types.ts';
import styles from './CreateReportModal.module.css';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';
import { E } from 'dist/server/chunks/astro_D3UBNB5r.mjs';

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
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setReportDetails({
      ...reportDetails,
      [e.target.name]: e.target.value,
    });
  };

  const isValid =
    reportDetails.name && reportDetails.urlTilSiden && reportDetails.teamId;

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
        <Modal.Body className={styles.modalBody}>
          <TextField
            label="Tittel"
            type="text"
            id="title"
            name="name"
            onChange={handleChange}
            required
          />
          <TextField
            label="URL"
            type="text"
            id="url"
            name="urlTilSiden"
            onChange={handleChange}
            required
          />
          <Select
            label="Hilket team er ansvarlig for løsningen?"
            name="teamId"
            onChange={handleChange}
            required
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
          <Button type="submit" disabled={!isValid} onClick={handleSubmit}>
            Opprett rapport
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
