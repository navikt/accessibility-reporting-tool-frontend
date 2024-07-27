import useSWRImmutable from 'swr/immutable';
import ReportList from './ReportList';
import { apiProxyUrl } from '@src/utils/clientUtils/urls.ts';
import { fetcher } from '@src/utils/clientUtils/api.ts';

function AllReportsList() {
  const { data: reportListData, isLoading: isLoadingList } = useSWRImmutable(
    { url: `${apiProxyUrl}/reports/list` },
    fetcher,
  );

  if (isLoadingList) {
    return null;
  }

  return <ReportList reports={reportListData} />;
}
export default AllReportsList;
