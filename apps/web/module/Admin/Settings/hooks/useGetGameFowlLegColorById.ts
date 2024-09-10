import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlLegColorById(legColorId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/leg-color/${legColorId}`
  );
}

function useGetGameFowlLegColorById(legColorId: string | undefined) {
  const query = useQuery({
    queryKey: ["leg-color", legColorId],
    queryFn: () => getGameFowlLegColorById(legColorId),
    enabled: !!legColorId,
  });
  return query;
}
export default useGetGameFowlLegColorById;
