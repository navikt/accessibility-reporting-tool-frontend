import { Textarea, Radio, RadioGroup, Link, Heading } from '@navikt/ds-react';
import type { CriterionType } from '@src/types.ts';
import styles from './Criterion.module.css';
import { Divider } from '@mui/material';

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
          legend={
            <Heading level="2" size="medium">
              {`${criterion.number} ${criterion.name}`}
            </Heading>
          }
          readOnly={!hasWriteAccess}
          onChange={(e) => {
            handleChange(criterion.number, 'status', e as string);
          }}
          description={
            <p className={styles.criterionHelpText}>
              {criterion.description}{' '}
              <span>
                Les mer på{' '}
                {criterion.wcagUrl && <Link href={criterion.wcagUrl}>W3C</Link>}
              </span>
              {criterion.helpUrl && (
                <span>
                  {' '}
                  Hvordan teste: <Link href={criterion.helpUrl}> Aksel</Link>
                </span>
              )}
            </p>
          }
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
              readOnly={!hasWriteAccess}
              onChange={(e) =>
                handleChange(criterion.number, 'breakingTheLaw', e.target.value)
              }
            />
            <Textarea
              className={styles.textarea}
              label="Det er innhold på siden som ikke er underlagt kravet"
              description="Hvilket innhold er ikke underlagt kravet?"
              defaultValue={criterion.lawDoesNotApply}
              readOnly={!hasWriteAccess}
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
              readOnly={!hasWriteAccess}
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
      <Divider />
    </div>
  );
};

export default Criterion;
