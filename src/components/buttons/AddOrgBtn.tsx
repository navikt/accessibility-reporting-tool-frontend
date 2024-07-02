import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

function AddOrgBtn() {
  return (
    <Button variant="secondary" icon={<PersonPlusIcon />}>
      Legg til organisasjonsenhet{' '}
    </Button>
  );
}

export default AddOrgBtn;
