import {Link } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import {fetcher} from "../../utils/api.client.ts";
import styles from "./Rapportliste.module.css";
import {apiUrl} from "@src/urls.ts";



interface Rapport {
    navn: string;
    url: string;
}

const RapportListe = () => {
    const { data ,isLoading } = useSWRImmutable({ url: apiUrl,  }, fetcher);
    console.log(data);

    if (isLoading){return  null}
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
                    )
                })}
            </ul>
        </div>

);
};
export default RapportListe;