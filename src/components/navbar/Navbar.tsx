import { Link } from '@navikt/ds-react';
import styles from './Navbar.module.css';
import { LeaveIcon } from '@navikt/aksel-icons';

type NavBarProps = {
  userMail: String;
};

function Navbar({ userMail }: NavBarProps) {
  return (
    <header className={styles.navBarContainer}>
      <ul className={styles.navBarP1}>
        <li>
          <Link underline={false} variant="neutral" href="/">
            Forside
          </Link>
        </li>
        <li>
          <Link underline={false} variant="neutral" href="/organisasjonsenhet">
            Organisasjonsenhet
          </Link>
        </li>
        <li>
          <Link underline={false} variant="neutral" href="/dineerklaeringer">
            Dine erklæringer
          </Link>
        </li>
        <li>
          <Link underline={false} variant="neutral" href="/rapportlisteSide">
            Alle rapporter
          </Link>
        </li>
      </ul>
      <ul className={styles.navBarP2}>
        <li>
          <p>
            Innlogget som <strong>{userMail}</strong>
          </p>
        </li>
        <li className={styles.utlogging}>
          <Link underline={false} href="#">
            <LeaveIcon></LeaveIcon>Logg Ut
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
