import { Heading } from '@navikt/ds-react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.contentGroups}>
        <div className={styles.contentGroup}>
          <Heading level="3" size="medium">
            Kontakt oss
          </Heading>
          <p>
            Har du spørsmål om universell utforming eller testing? Kontakt oss
            på e-post eller Slack.
          </p>
          <a href="mailto:uu@nav.no">E-post</a>
          <a href="https://nav-it.slack.com/archives/C7MANSGLS">Slack</a>
        </div>
        <div className={styles.contentGroup}>
          <Heading level="3" size="medium">
            Har du tilbakemelding?
          </Heading>
          <p>
            Oppdager du feil eller har forslag til forbedringer? Legg inn en
            issue på GitHub.
          </p>
          <a href="https://github.com/navikt/accessibility-reporting-tool-frontend">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
