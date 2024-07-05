import { BodyLong, Button, Heading, Link, VStack } from '@navikt/ds-react';
import styles from './Frontpage.module.css';
import { ComponentIcon, FigureIcon, WrenchIcon } from '@navikt/aksel-icons';
import { Tabs, Select } from '@navikt/ds-react';
import { useState } from 'react';
import RapportListe from '@components/rapportliste/rapportListe';
import { FilePlusIcon } from '@navikt/aksel-icons';
import { PieChart } from '@mui/x-charts/PieChart';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/api.client.ts';

const userInTeam = true;

function FrontpageWithoutTeam() {
  const { data, isLoading } = useSWRImmutable(
    { url: 'http://localhost:8787/testRapport' },
    fetcher,
  );

  console.log(data);

  if (isLoading) {
    return null;
  }

  return (
    <main>
      <section className={styles.section1}>
        <section className={styles.innerSection1}>
          <Heading size="xlarge">a11y rapporteringsverktøy for NAV</Heading>
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
          <Heading size="medium">Verktøy</Heading>
          <p className={styles.verktoyTekst}>
            Dette er noen av verktøyene vi anbefaler for rapportering
          </p>
        </article>

        <article className={styles.article}>
          <ComponentIcon title="code icon" fontSize="3rem" />
          <Heading size="medium">
            Les mer på <Link href="https://aksel.nav.no/">Aksel.no</Link>
          </Heading>
        </article>

        <article className={styles.article}>
          <FigureIcon title="accessibility figure icon" fontSize="3rem" />
          <Heading size="medium">
            Les mer på{' '}
            <Link href="https://www.uutilsynet.no/">uutilsynet.no</Link>
          </Heading>
        </article>
      </section>
    </main>
  );
}

type UserProps = {
  userName: String;
};

{
  //    ******  KODEN UNDER HER BESTEMMER HVA SOM VISES HVIS BRUKEREN ER MEDLEM AV MINST ETT TEAM  ******
}

function FrontpageWithTeam({ userName }: UserProps) {
  const [state, setState] = useState('mittTeam');

  return (
    <main className={styles.teamContent}>
      <header>
        <h1 className={styles.h1}>God dag {userName}</h1>
        <BodyLong>Du er med i følgende organisasjonsenheter:</BodyLong>
      </header>

      <Tabs value={state} onChange={setState}>
        <Tabs.List>
          <Tabs.Tab value="mittTeam" label="Mitt team" />
          <Tabs.Tab value="mineRapporter" label="Mine rapporter" />
        </Tabs.List>
        <Tabs.Panel value="mittTeam" className="h-24 w-full bg-gray-50 p-4">
          <header className={styles.myTeamHeader}>
            <Select className={styles.selector} label="Velg team">
              <option value="">Velg team</option>
              <option value="teamInkludering">Team Inkludering</option>
              <option value="teamMats">Team Mats</option>
            </Select>
            <Button icon={<FilePlusIcon />}>Lag ny erklæring</Button>
          </header>
          <section className={styles.gridWrapper}>
            <section className={styles.lastChanges}>
              <Heading size="medium">Siste endringer</Heading>
            </section>
            <article className={styles.accessibilityStatusContainer}>
              <Heading size="large">Tilgjengelighetsstatus</Heading>
              <section className={styles.accessibilityStatusInner}>
                <aside className={styles.selectStatementContainer}>
                  <Heading size="medium">Erklæringer</Heading>
                </aside>

                <PieChart
                  colors={['red', 'gray', 'green']}
                  series={[
                    {
                      data: [
                        { value: 70, color: 'green', label: 'Oppfylt (%)' },
                        { value: 20, color: 'red', label: 'Ikke oppfylt (%)' },
                        { value: 10, color: 'gray', label: 'Ikke aktuelt (%)' },
                      ],
                      innerRadius: 30,
                      outerRadius: 150,
                      paddingAngle: 3,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                    },
                  ]}
                  width={550}
                  height={300}
                />
              </section>
            </article>
            <article className={styles.membersContainer}>
              <Heading size="medium">Admin</Heading>
              <Heading size="medium">Medlemmer</Heading>
            </article>
            <section className={styles.reportsContainer}>
              <Heading size="large" spacing>
                Rapporter
              </Heading>
              <RapportListe />
              <Heading size="large" spacing>
                Samlerapporter
              </Heading>
            </section>
          </section>
        </Tabs.Panel>
        <Tabs.Panel
          value="mineRapporter"
          className="h-24 w-full bg-gray-50 p-4"
        >
          <header className={styles.myReportsHeader}>
            <Button icon={<FilePlusIcon />} className={styles.addStatementBtn}>
              Lag ny erklæring
            </Button>
          </header>
          <section className={styles.myReportsContainer}>
            <section>
              <Heading size="large">Mine rapporter</Heading>
              <Select className={styles.selector2} label="">
                <option value="">Velg team</option>
                <option value="teamInkludering">Team Inkludering</option>
                <option value="teamMats">Team Mats</option>
              </Select>
            </section>

            <RapportListe />
          </section>
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}

function ConditionalFrontpage() {
  if (userInTeam) {
    return <FrontpageWithTeam userName="Ola Nordmann" />;
  }
  {
    return <FrontpageWithoutTeam />;
  }
}

export default ConditionalFrontpage;
