import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlFederationById(
  federationId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/federation/${federationId}`
  );
}

function useGetGameFowlFederationById(federationId: string | undefined) {
  const query = useQuery({
    queryKey: ["federation", federationId],
    queryFn: () => getGameFowlFederationById(federationId),
    enabled: !!federationId,
  });
  return query;
}
export default useGetGameFowlFederationById;
