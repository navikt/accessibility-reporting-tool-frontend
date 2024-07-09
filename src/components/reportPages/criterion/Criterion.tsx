import { Textarea, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import type { CriterionType } from '@src/types';
import styles from './Criterion.module.css';

type CriterionProps = {
  criterion: CriterionType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Criterion = ({ criterion, handleChange }: CriterionProps) => {
  return (
    <div className={styles.criterionWrapper}>
      <div className={styles.criterion}>
        <RadioGroup
          className={styles.radioGroup}
          legend={criterion.title}
          onChange={handleChange}
          description={criterion.description}
          defaultValue={
            criterion.state !== 'notTested' ? criterion.state : 'notTested'
          }
        >
          <Radio value="yes">Ja</Radio>
          <Radio value="no">Nei</Radio>
          <Radio value="notTested">Ikke testet</Radio>

          <Radio value="notApplicable">Ikke aktuelt</Radio>
        </RadioGroup>
        {criterion.state === 'no' ? (
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
