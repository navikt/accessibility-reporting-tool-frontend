import { Link, VStack } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import {fetcher} from "@src/utils/api.client.ts";

interface Rapport {
    navn: string;
    url: string;
}

const RapportListe = () => {
    const { data ,isLoading } = useSWRImmutable({ url: "http://localhost:8787/api",  }, fetcher);
    console.log(data);

    if (isLoading){return  null}

    return (
        <VStack gap="3" align="start">
            <ul>
                {data.map((rapport: Rapport) => {
                    return (
                        <li key={rapport.navn}>
                            <Link href={rapport.url} variant="action">
                                {rapport.navn}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </VStack>
);
};

export default RapportListe;