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
          legend={criterion.name}
          onChange={handleChange}
          description={criterion.description}
          defaultValue={
            criterion.status !== 'NOT_TESTED' ? criterion.status : 'NOT_TESTED'
          }
        >
          <Radio value="COMPLIANT">Ja</Radio>
          <Radio value="NON_COMPLIANT">Nei</Radio>
          <Radio value="NOT_TESTED">Ikke testet</Radio>

          <Radio value="NOT_APPLICABLE">Ikke aktuelt</Radio>
        </RadioGroup>
        {criterion.status === 'NON_COMPLIANT' ? (
          <div className={styles.textareaWrapper}>
            <Textarea
              className={styles.textarea}
              label="Det er innhold på siden som bryter kravet."
              description="Beskriv kort hvilket innhold som bryter kravet, hvorfor og konsekvensene dette får for brukeren."
              defaultValue={criterion.breakingTheLaw}
            />
            <Textarea
              className={styles.textarea}
              label="Det er innhold i på siden som ikke er underlagt kravet"
              description="Hvilket innhold er ikke underlagt kravet?
"
              defaultValue={criterion.lawDoesNotApply}
            />
            <Textarea
              className={styles.textarea}
              label="Innholdet er unntatt fordi det er en uforholdsmessig stor byrde å følge kravet."
              description="Hvorfor mener vi at det er en uforholdsmessig stor byrde for innholdet å følge kravet?"
              defaultValue={criterion.tooHardToComply}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Criterion;
