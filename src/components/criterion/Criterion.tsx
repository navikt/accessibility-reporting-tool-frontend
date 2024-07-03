import { Textarea, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import type { CriterionProps } from './CriterionProps';
import styles from './Criterion.module.css';

const Criterion = (criterion: CriterionProps) => {
  const [currentState, setCurrentState] = useState<string>('');
  const handleChange = (val: string) => {
    setCurrentState(val);
    console.log(val);
  };

  return (
    <div className={styles.criterionWrapper}>
      <div className={styles.criterion}>
        <RadioGroup
          className={styles.radioGroup}
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
            className={styles.textarea}
            label="Hva er grunnen til at du mener kriteriet ikke er oppfylt?"
            description="Her skal du beskrive promblemene dette kriteriet medfører, og inforfomere brukeren om eventuelle workarounds."
          />
        ) : null}
      </div>
    </div>
  );
};

export default Criterion;
