import { Link, Table } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import type { SortState } from '@navikt/ds-react';

interface Rapport {
  title: string;
  id: string;
  teamId: string;
  date: string;
}

interface ReportListProps {
  reports: Rapport[];
}

const ReportList = ({ reports }: ReportListProps) => {
  const [data, setData] = useState(reports);

  const [sort, setSort] = useState<SortState | undefined>();
  console.log(data);

  const handleSort = (sortKey: string) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === 'descending'
        ? undefined
        : {
            orderBy: sortKey,
            direction:
              sort && sortKey === sort.orderBy && sort.direction === 'ascending'
                ? 'descending'
                : 'ascending',
          },
    );
  };

  const comparator = (a: Rapport, b: Rapport, orderBy: keyof Rapport) => {
    if (a[orderBy] < b[orderBy] || a[orderBy] === undefined) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedData = data?.slice().sort((a: Rapport, b: Rapport) => {
    if (sort) {
      return sort.direction === 'ascending'
        ? comparator(a, b, sort.orderBy as keyof Rapport)
        : comparator(b, a, sort.orderBy as keyof Rapport);
    }
    return 0;
  });

  const format = (dateStr?: string) => {
    if (!dateStr) {
      return 'No Date Provided'; // Handle undefined or null date
    }

    console.log('Date String:', dateStr); // Log the date string to see its format
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) {
      console.error('Invalid date:', dateStr); // Log the error
      return 'Invalid Date';
    }
    const date = new Date(year, month - 1, day);
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${d}.${m}.${y}`;
  };

  // if (isLoading) return <div>Loading...</div>;
  useEffect(() => {
    setData(reports);
  }, [reports]);

  return (
    <div>
      <Table
        size="large"
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as string)}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="navn" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
            <Table.ColumnHeader sortKey="dato" sortable>
              Dato
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData?.map((rapport: Rapport) => {
            return (
              <Table.Row key={rapport.title}>
                <Table.HeaderCell>
                  <Link href={rapport.teamId} variant="action">
                    {rapport.title}
                  </Link>
                </Table.HeaderCell>
                <Table.DataCell>{rapport.teamId}</Table.DataCell>
                <Table.DataCell>{format(rapport.date)}</Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ReportList;
