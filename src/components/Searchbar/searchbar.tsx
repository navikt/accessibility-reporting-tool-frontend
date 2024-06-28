import { Search } from "@navikt/ds-react";
import styles from "./Searchbar.module.css"
import useSWRImmutable from "swr/immutable";
import {apiUrl} from "@src/urls.ts";
import {fetcher} from "@src/utils/api.client.ts";
import {useState} from "react";
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';


interface Rapport{
    navn: string;
    url: string;
}

const Searchbar = () => {
    const { data ,isLoading } = useSWRImmutable({ url: `${apiUrl}/reports/list`,  }, fetcher);
    console.log(data);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Rapport[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setResults([]);
        } else {
            const filteredData = data?.filter((item: Rapport) =>
                item.navn.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredData || []);
        }
    };
    if (!data) return <div>Loading...</div>;
    return (
        <div>
            <MagnifyingGlassIcon className={styles.searchIcon}/>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                className={styles.searchInput}
                placeholder="Søk"
            />

            <ul>
                {results.map((item) => (
                    <li key={item.navn}>
                        <a href={item.url}>{item.navn}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Searchbar;