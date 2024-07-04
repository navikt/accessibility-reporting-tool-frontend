import Criteria from './criteria/Criteria';
import { useState } from 'react';
import { Stepper } from '@navikt/ds-react';

const CreateReport = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={(x) => setActiveStep(x)}
        orientation="horizontal"
      >
        <Stepper.Step href="#">Metadata</Stepper.Step>
        <Stepper.Step href="#">Mulig å oppfatte</Stepper.Step>
        <Stepper.Step href="#">Mulig å betjene</Stepper.Step>
        <Stepper.Step href="#">Forståelig</Stepper.Step>
        <Stepper.Step href="#">Robust</Stepper.Step>
      </Stepper>
      <Criteria />
    </div>
  );
};

export default CreateReport;
