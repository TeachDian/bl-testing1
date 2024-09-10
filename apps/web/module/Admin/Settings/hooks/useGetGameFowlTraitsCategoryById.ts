import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlTraitsCategory(
  traitsCategoryId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/traits-category/${traitsCategoryId}`
  );
}

function useGetGameFowlTraitsCategory(traitsCategoryId: string | undefined) {
  const query = useQuery({
    queryKey: ["traits-category", traitsCategoryId],
    queryFn: () => getGameFowlTraitsCategory(traitsCategoryId),
    enabled: !!traitsCategoryId,
  });
  return query;
}
export default useGetGameFowlTraitsCategory;
