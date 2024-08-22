import { Button, Heading, Link } from '@navikt/ds-react';
import styles from './Home.module.css';
import { ArrowRightIcon, ComponentIcon, FigureIcon } from '@navikt/aksel-icons';
import useSWRImmutable from 'swr/immutable';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import { fetcher } from '@src/utils/client/api.ts';
import MyTeam from '@components/teamDashboard/MyTeam';

const Home = () => {
  const { data: userData, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );
  return (
    <>
      {userData?.teams !== undefined && <MyTeam />}
      <main>
        <section className={styles.section1}>
          <section className={styles.innerSection1}>
            <Heading level="1" size="xlarge">
              Velkommen til A11y Statement!
            </Heading>
            <p className={styles.text}>
              Denne applikasjonen er NAVs interne rapporteringsverktøy for
              tilgjengelighetserklæringer
            </p>
            <Button
              as={Link}
              href="/teams"
              underline={false}
              variant="secondary"
              iconPosition="right"
              icon={<ArrowRightIcon />}
            >
              Finn eller lag ditt team
            </Button>
          </section>
        </section>
        <section className={styles.section2}>
          <article className={styles.article}>
            <ComponentIcon title="code icon" fontSize="3rem" />
            <Heading level="3" size="medium">
              Les mer på{' '}
              <Link href="https://aksel.nav.no/god-praksis/universell-utforming">
                Aksel.no
              </Link>
            </Heading>
          </article>

          <article className={styles.article}>
            <FigureIcon title="accessibility figure icon" fontSize="3rem" />
            <Heading level="3" size="medium">
              Les mer på{' '}
              <Link href="https://www.uutilsynet.no/veiledning/tilgjengelighetserklaering/1127">
                uutilsynet.no
              </Link>
            </Heading>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
