import { Link } from '@navikt/ds-react';
import styles from './Navbar.module.css';
import { LeaveIcon } from '@navikt/aksel-icons';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';
import { fetcher } from '@src/utils/clientUtils/api.ts';
import useSWR from 'swr';

function Navbar() {
  const { data, isLoading } = useSWR(
    { url: `${apiProxyUrl}/users/details` },
    fetcher,
  );

  if (isLoading) {
    return null;
  }

  return (
    <header className={styles.navBarContainer}>
      <ul className={styles.navBarP1}>
        <li>
          <Link underline={false} variant="neutral" href="/">
            Forside
          </Link>
        </li>
        <li>
          <Link underline={false} variant="neutral" href="/teams">
            Teams
          </Link>
        </li>
        <li>
          <Link underline={false} variant="neutral" href="/alleRapporter">
            Alle rapporter
          </Link>
        </li>
      </ul>
      <ul className={styles.navBarP2}>
        <li>
          <p>
            Innlogget som <strong>{data.email}</strong>
          </p>
        </li>
        <li className={styles.utlogging}>
          <Link underline={false} href="/oauth2/logout">
            <LeaveIcon /> Logg Ut
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
