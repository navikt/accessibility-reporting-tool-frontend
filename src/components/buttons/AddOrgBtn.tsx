import React from 'react';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

interface AddOrgBtnProps {
  onClick: () => void;
}

const AddOrgBtn: React.FC<AddOrgBtnProps> = ({ onClick }) => {
  return (
    <Button icon={<PersonPlusIcon />} onClick={onClick}>
      Legg til ditt team{' '}
    </Button>
  );
};

export default AddOrgBtn;
