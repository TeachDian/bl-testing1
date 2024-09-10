import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getBreedingSeasonById(seasonId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/breeding-season/${seasonId}`
  );
}

function useGetBreedingSeasonById(seasonId: string | undefined) {
  const query = useQuery({
    queryKey: ["breeding-season", seasonId],
    queryFn: () => getBreedingSeasonById(seasonId),
    enabled: !!seasonId,
  });
  return query;
}
export default useGetBreedingSeasonById;
