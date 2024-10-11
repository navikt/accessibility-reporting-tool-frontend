import { BodyLong, Heading } from '@navikt/ds-react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.contentGroups}>
        <div className={styles.contentGroup}>
          <Heading level="3" size="medium">
            Kontakt oss
          </Heading>
          <BodyLong>
            Har du spørsmål om universell utforming eller testing? Kontakt oss
            på e-post eller Slack.
          </BodyLong>
          <span className={styles.footerLinks}>
            <a href="mailto:uu@nav.no">E-post</a>
            <a href="https://nav-it.slack.com/archives/C7MANSGLS">Slack</a>
          </span>
        </div>
        <div className={styles.contentGroup}>
          <Heading level="3" size="medium">
            Har du tilbakemelding?
          </Heading>
          <BodyLong>
            Oppdager du feil eller har forslag til forbedringer? Legg inn en
            issue på GitHub.
          </BodyLong>
          <a href="https://github.com/navikt/accessibility-reporting-tool-frontend">
            GitHub
          </a>
        </div>
        <div className={styles.contentGroup}>
          <Heading level="3" size="medium">
            Nyttige resurser
          </Heading>
          <span className={styles.footerLinks}>
            <a href="https://aksel.nav.no/god-praksis/universell-utforming">
              Universell utforming i NAV
            </a>
            <a href="https://chatgpt.com/g/g-KNxDmPfob-web-accessibility-expert">
              Web Accessibility Expert (GPT av Morten Tollefsen)
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
