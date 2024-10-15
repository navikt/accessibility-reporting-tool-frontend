import { TrashIcon } from '@navikt/aksel-icons';
import { Modal, Button, BodyLong } from '@navikt/ds-react';
import { deleteTeam } from '@src/services/teamServices';
import { useRef } from 'react';
import styles from '../Modal.module.css';

interface DeleteTeamModalProps {
  teamId: string;
}

const DeleteTeamModal = ({ teamId }: DeleteTeamModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant="danger"
        icon={<TrashIcon aria-hidden />}
        className={styles.button}
        onClick={() => ref.current?.showModal()}
      >
        Slett
      </Button>

      <Modal ref={ref} header={{ heading: 'Slett team' }}>
        <Modal.Body>
          <BodyLong>Er du sikker på at du vil slette dette teamet?</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteTeam(teamId);
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

export default DeleteTeamModal;
