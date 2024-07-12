import useSWRImmutable from "swr/immutable";
import ReportList from "./ReportList";
import { apiUrl } from "@src/urls";
import { fetcher } from "@src/utils/api.client";

function AllReportsList(){
    const { data: reportListData, isLoading: isLoadingList } = useSWRImmutable(
        { url: `${apiUrl}/reports/list` },
        fetcher,
      );

    if(isLoadingList){
      return null;
    }

    return(
        <ReportList reports={reportListData}/>
    )
}
export default AllReportsList;