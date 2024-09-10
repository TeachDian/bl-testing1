import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlMaterialsById(
  gameFowlMaterialsId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_MODULE}/breeding-materials/${gameFowlMaterialsId}`
  );
}

function useGetGameFowlMaterialsById(gameFowlMaterialsId: string | undefined) {
  const query = useQuery({
    queryKey: ["breeding-materials", gameFowlMaterialsId],
    queryFn: () => getGameFowlMaterialsById(gameFowlMaterialsId),
    enabled: !!gameFowlMaterialsId,
  });
  return query;
}
export default useGetGameFowlMaterialsById;
