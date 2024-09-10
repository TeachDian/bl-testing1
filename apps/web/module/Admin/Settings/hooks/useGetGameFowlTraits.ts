import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlTraitsById(traitsId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/traits/${traitsId}`);
}

function useGetGameFowlTraitsById(traitsId: string | undefined) {
  const query = useQuery({
    queryKey: ["traits", traitsId],
    queryFn: () => getGameFowlTraitsById(traitsId),
    enabled: !!traitsId,
  });
  return query;
}
export default useGetGameFowlTraitsById;
