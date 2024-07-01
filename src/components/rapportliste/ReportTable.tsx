import { Link } from '@navikt/ds-react';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '../../utils/api.client.ts';
import styles from './ReportTable.module.css';
import { apiUrl } from '@src/urls.ts';
import { useState } from 'react';
import { type SortState, Table } from "@navikt/ds-react";


interface Report {
  name: string;
  url: string;
  date: string;
}
/*
const RapportListe = () => {
  const { data, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/reports/list` },
    fetcher,
  );
  const [sort, setSort] = useState<SortState | undefined>();
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
*/



const ReportTable = () => {

  const { data, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/reports/list` },
    fetcher,
  );
  const [sort, setSort] = useState<SortState | undefined>();
  console.log(data);

  const handleSort = (sortKey: keyof Report) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === "descending"
        ? undefined
        : {
            orderBy: sortKey,
            direction:
              sort && sortKey === sort.orderBy && sort.direction === "ascending"
                ? "descending"
                : "ascending",
          },
    );
  };

  const comparator = (a: Report, b:Report, orderBy: keyof Report) => {
    if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedData = data.slice().sort((a: Report, b: Report) => {
    if (sort) {
      return sort.direction === "ascending"
        ? comparator(b, a, sort.orderBy)
        : comparator(a, b, sort.orderBy);
    }
    return 1;
  });

  return (
    <>
      <Table sort={sort} onSortChange={(sortKey) => handleSort(sortKey)}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="name" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
            <Table.ColumnHeader sortKey="date" sortable>
              Dato
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map(( report: Report) => {
            return (
              <Table.Row key={report.name}>
                <Table.HeaderCell scope="row">{report.url}</Table.HeaderCell>
                <Table.DataCell>{report.url}</Table.DataCell>
                <Table.DataCell>{format(new Date(report.date))}</Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

const format = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${d}.${m}.${y}`;
};


export default ReportTable;
