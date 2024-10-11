import { useRef, useState, useEffect } from 'react';
import { Button, Modal, Select, TextField, Checkbox } from '@navikt/ds-react';
import { createReport } from '@src/services/reportServices';
import { FilePlusIcon } from '@navikt/aksel-icons';
import { fetcher } from '@src/utils/client/api.ts';
import useSWRImmutable from 'swr/immutable';
import type { InitialReport, Team } from '@src/types.ts';
import styles from '../Modal.module.css';
import { apiProxyUrl } from '@src/utils/client/urls.ts';

const CreateReportModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [reportDetails, setReportDetails] = useState<InitialReport>({
    name: '',
    urlTilSiden: '',
    teamId: '',
    isPartOfNavNo: true,
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

  const handleCheckboxChange = () => {
    setReportDetails({
      ...reportDetails,
      isPartOfNavNo: !reportDetails.isPartOfNavNo,
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
      <Modal
        ref={ref}
        header={{ heading: 'Opprett rapport' }}
        closeOnBackdropClick={true}
      >
        <Modal.Body className={styles.modalBody}>
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
          <Checkbox
            description="Hvis rapporten er for en applikasjon som er en del av NAV.no, huk av her."
            name="isPartOfNavNo"
            onChange={handleCheckboxChange}
            value={!reportDetails.isPartOfNavNo}
            defaultChecked={reportDetails.isPartOfNavNo}
          >
            Tjenesten er under NAV.no
          </Checkbox>
          <Select
            label="Hvilket team er ansvarlig for løsningen?"
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
