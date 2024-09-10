import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getActivityById(activityId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/activities/${activityId}`
  );
}

function useGetActivityById(activityId: string | undefined) {
  const query = useQuery({
    queryKey: ["activities", activityId],
    queryFn: () => getActivityById(activityId),
    enabled: !!activityId,
  });
  return query;
}
export default useGetActivityById;
