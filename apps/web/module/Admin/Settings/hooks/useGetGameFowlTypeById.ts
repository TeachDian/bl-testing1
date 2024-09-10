import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlTypeById(typeId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/type/${typeId}`);
}

function useGetGameFowlTypeById(typeId: string | undefined) {
  const query = useQuery({
    queryKey: ["type", typeId],
    queryFn: () => getGameFowlTypeById(typeId),
    enabled: !!typeId,
  });
  return query;
}
export default useGetGameFowlTypeById;
