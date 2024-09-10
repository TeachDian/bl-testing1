import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlStatusById(statusId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/status/${statusId}`);
}

function useGetGameFowlStatusById(statusId: string | undefined) {
  const query = useQuery({
    queryKey: ["status", statusId],
    queryFn: () => getGameFowlStatusById(statusId),
    enabled: !!statusId,
  });
  return query;
}
export default useGetGameFowlStatusById;
