import { Button, Heading, Link } from '@navikt/ds-react';
import styles from './Frontpage.module.css';
import { ComponentIcon, FigureIcon, WrenchIcon } from '@navikt/aksel-icons';
import ConditionalTeamDashboard from '@components/teamDashboard/TeamDashboard';

const userInTeam = true;

function FrontpageWithoutTeam() {
  return (
    <main>
      <section className={styles.section1}>
        <section className={styles.innerSection1}>
          <Heading level="1" size="xlarge">
            a11y rapporteringsverktøy for NAV
          </Heading>
          <p className={styles.text}>
            Dette rapporteringsverktøyet er designet for å styrke NAVs innsats
            for å sikre universell tilgjengelighet på sine digitale plattformer.
          </p>
          <Button>Finn ditt team</Button>
        </section>
      </section>
      <section className={styles.section2}>
        <article className={styles.article}>
          <WrenchIcon title="wrench icon" fontSize="3rem" />
          <Heading level="3" size="medium">
            Verktøy
          </Heading>
          <p className={styles.verktoyTekst}>
            Dette er noen av verktøyene vi anbefaler for rapportering
          </p>
        </article>

        <article className={styles.article}>
          <ComponentIcon title="code icon" fontSize="3rem" />
          <Heading level="3" size="medium">
            Les mer på <Link href="https://aksel.nav.no/">Aksel.no</Link>
          </Heading>
        </article>

        <article className={styles.article}>
          <FigureIcon title="accessibility figure icon" fontSize="3rem" />
          <Heading level="3" size="medium">
            Les mer på{' '}
            <Link href="https://www.uutilsynet.no/">uutilsynet.no</Link>
          </Heading>
        </article>
      </section>
    </main>
  );
}

function ConditionalFrontpage() {
  if (userInTeam) {
    return <ConditionalTeamDashboard isMyTeam={userInTeam} />;
  }
  {
    return <FrontpageWithoutTeam />;
  }
}

export default ConditionalFrontpage;
