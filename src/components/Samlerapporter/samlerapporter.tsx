import { Link } from '@navikt/ds-react';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@src/utils/clientUtils/api.ts';
import styles from './Samlerapporter.module.css';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';

interface Rapport {
  navn: string;
  url: string;
}

const SamletListe = () => {
  const { data, isLoading } = useSWRImmutable(
    { url: `${apiProxyUrl}/reports/summary` },
    fetcher,
  );
  console.log(data);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <ul className={styles.styledList}>
        {data.map((rapport: Rapport) => {
          return (
            <li key={rapport.navn} className={styles.styledlistItem}>
              <Link href={rapport.url} variant="action">
                {rapport.navn}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SamletListe;
