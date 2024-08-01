import useSWRImmutable from 'swr/immutable';
import ReportList from './ReportList';
import { apiProxyUrl } from '@src/utils/client/urls.ts';
import { fetcher } from '@src/utils/client/api.ts';
import useSWR from 'swr';

function AllReportsList() {
  const { data: reportListData, isLoading: isLoadingList } = useSWR(
    { url: `${apiProxyUrl}/reports/list` },
    fetcher,
  );

  if (isLoadingList) {
    return null;
  }

  return <ReportList reports={reportListData} />;
}
export default AllReportsList;
