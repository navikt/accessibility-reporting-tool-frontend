import { Button, Heading, Link } from '@navikt/ds-react';
import styles from './Frontpage.module.css';
import {
  ArrowRightIcon,
  ComponentIcon,
  FigureIcon,
  WrenchIcon,
} from '@navikt/aksel-icons';
import useSWRImmutable from 'swr/immutable';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import { fetcher } from '@src/utils/client/api.ts';
import { useEffect, useState } from 'react';
import MyTeam from '@components/teamDashboard/MyTeam';

function FrontpageWithoutTeam() {
  return (
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
  );
}

function ConditionalFrontpage() {
  const { data: userData, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  const [userInTeam, setUserInTeam] = useState<boolean>();

  useEffect(() => {
    if (userData?.teams.length > 0) {
      //Sjekker om innlogget bruker er del av et team
      setUserInTeam(true);
    } else {
      setUserInTeam(false);
    }
  }, [userData]);

  if (userInTeam) {
    //Hvis ja; vis forside der du kan velge hvilket team du vil se dashboard for
    return <MyTeam />;
  }
  {
    return <FrontpageWithoutTeam />; //Hvis nei; vis generisk, statisk side, som er deklarert i den funksjonelle komponenten over.
  }
}

export default ConditionalFrontpage;
