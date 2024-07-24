import { Textarea, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import type { CriterionType } from '@src/types';
import styles from './Criterion.module.css';

type CriterionProps = {
  criterion: CriterionType;
  handleChange: (
    WCAGId: string,
    fieldToUpdate: string,
    updatedData: string,
  ) => void;
  hasWriteAccess: boolean;
};

const Criterion = ({
  criterion,
  handleChange,
  hasWriteAccess,
}: CriterionProps) => {
  return (
    <div className={styles.criterionWrapper}>
      <div className={styles.criterion}>
        <RadioGroup
          className={styles.radioGroup}
          legend={criterion.name}
          disabled={!hasWriteAccess}
          onChange={(e) => {
            handleChange(criterion.number, 'status', e as string);
          }}
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
              disabled={!hasWriteAccess}
              onChange={(e) =>
                handleChange(criterion.number, 'breakingTheLaw', e.target.value)
              }
            />
            <Textarea
              className={styles.textarea}
              label="Det er innhold i på siden som ikke er underlagt kravet"
              description="Hvilket innhold er ikke underlagt kravet?
"
              defaultValue={criterion.lawDoesNotApply}
              disabled={!hasWriteAccess}
              onChange={(e) =>
                handleChange(
                  criterion.number,
                  'lawDoesNotApply',
                  e.target.value,
                )
              }
            />
            <Textarea
              className={styles.textarea}
              label="Innholdet er unntatt fordi det er en uforholdsmessig stor byrde å følge kravet."
              description="Hvorfor mener vi at det er en uforholdsmessig stor byrde for innholdet å følge kravet?"
              defaultValue={criterion.tooHardToComply}
              disabled={!hasWriteAccess}
              onChange={(e) =>
                handleChange(
                  criterion.number,
                  'tooHardToComply',
                  e.target.value,
                )
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Criterion;
