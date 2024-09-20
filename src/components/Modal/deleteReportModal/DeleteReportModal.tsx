import { TrashIcon } from '@navikt/aksel-icons';
import { Modal, Button, BodyLong } from '@navikt/ds-react';
import { deleteReport } from '@src/services/reportServices';
import { useRef } from 'react';
import styles from '../Modal.module.css';

interface DeleteReportModalProps {
  reportId: string;
}

const DeleteReportModal = ({ reportId }: DeleteReportModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant="danger"
        icon={<TrashIcon aria-hidden />}
        className={styles.button}
        onClick={() => ref.current?.showModal()}
      >
        Slett rapport
      </Button>

      <Modal ref={ref} header={{ heading: 'Slett rapport' }}>
        <Modal.Body>
          <BodyLong>Er du sikker på at du vil slette denne rapporten?</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteReport(reportId);
              //window.location.href = '/reports';
            }}
          >
            Slett
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

export default DeleteReportModal;
