import React from 'react';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

interface AddOrgBtnProps {
  onClick: () => void;
}

const AddOrgBtn: React.FC<AddOrgBtnProps> = ({ onClick }) => {
  return (
    <Button variant="secondary" icon={<PersonPlusIcon />} onClick={onClick}>
      Legg til organisasjonsenhet{' '}
    </Button>
  );
};

export default AddOrgBtn;
