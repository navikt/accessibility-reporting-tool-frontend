import { Link, Table } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { formatDate } from '@src/utils/client/date';
import type { SortState } from '@navikt/ds-react';
import type { ReportSummary } from '@src/types';

interface ReportListProps {
  reports: ReportSummary[];
}

const ReportList = ({ reports }: ReportListProps) => {
  const [sort, setSort] = useState<SortState | undefined>();

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

  const comparator = (
    a: ReportSummary,
    b: ReportSummary,
    orderBy: keyof ReportSummary,
  ) => {
    if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedData = reports
    ?.slice()
    .sort((a: ReportSummary, b: ReportSummary) => {
      if (sort) {
        console.log(a, 'hei', b);
        return sort.direction === 'ascending'
          ? comparator(b, a, sort.orderBy as keyof ReportSummary)
          : comparator(a, b, sort.orderBy as keyof ReportSummary);
      }
      return 1;
    });

  return (
    <div>
      <Table
        size="large"
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as string)}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="title" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
            <Table.ColumnHeader sortKey="date" sortable>
              Sist endret
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData?.map((report: ReportSummary) => {
            return (
              <Table.Row key={report.id}>
                <Table.HeaderCell>
                  {report.teamId !== '' ? (
                    <Link href={`/reports/${report.id}`} variant="action">
                      {report.title === '' ? 'Uten navn' : report.title}
                    </Link>
                  ) : (
                    <Link
                      href={`/reports/aggregated/${report.id}`}
                      variant="action"
                    >
                      {report.title === '' ? '(Uten navn)' : report.title}
                    </Link>
                  )}
                </Table.HeaderCell>
                <Table.DataCell>
                  <Link href={`/teams/${report.teamId}`}>
                    {report.teamName}
                  </Link>
                </Table.DataCell>
                <Table.DataCell>{formatDate(report.date)}</Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ReportList;
