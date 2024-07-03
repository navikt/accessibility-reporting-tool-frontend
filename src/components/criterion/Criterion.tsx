import { Textarea, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';

type CriterionProps = {
  title: string;
  description: string;
  WCAGId: string;
  state: string;
};

const Criterion = (criterion: CriterionProps) => {
  const [currentState, setCurrentState] = useState<string>('');
  const handleChange = (val: string) => {
    setCurrentState(val);
    console.log(val);
  };

  return (
    <div>
      <RadioGroup
        legend={criterion.title}
        onChange={handleChange}
        description={criterion.description}
      >
        <Radio value="yes">Ja</Radio>
        <Radio value="no">Nei</Radio>
        <Radio value="notApplicable">Ikke aktuelt</Radio>
      </RadioGroup>
      {currentState === 'no' ? (
        <Textarea
          label="Hva er grunnen til at du mener kriteriet ikke er oppfylt?"
          description="Her skal du beskrive promblemene dette kriteriet medfører, og inforfomere brukeren om eventuelle workarounds."
        />
      ) : null}
    </div>
  );
};

export default Criterion;
