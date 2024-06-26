import { Link } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import {fetcher} from "@src/utils/api.client.ts";
import styles from "./TeamListe.module.css";


interface Team{
    navn: string;
    url: string;
}

const TeamListe = () => {
    const { data, isLoading } = useSWRImmutable({ url: "http://localhost:8787/teams", }, fetcher);
    console.log(data);

    if (isLoading){return null}

    return (
            <ul className={styles.list}>
                {data.map((team: Team) => {
                    return (
                        <li key={team.navn}>
                            <Link href={team.url} variant="neutral">
                                {team.navn}
                            </Link>
                        </li>
                    )
                })}
            </ul>
    );
};

export default TeamListe;