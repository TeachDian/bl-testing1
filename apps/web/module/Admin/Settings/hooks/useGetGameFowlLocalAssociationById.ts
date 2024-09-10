import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlLocalAssociationById(
  associationId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/local-association/${associationId}`
  );
}

function useGetGameFowlLocalAssociationById(associationId: string | undefined) {
  const query = useQuery({
    queryKey: ["local-association", associationId],
    queryFn: () => getGameFowlLocalAssociationById(associationId),
    enabled: !!associationId,
  });
  return query;
}
export default useGetGameFowlLocalAssociationById;
