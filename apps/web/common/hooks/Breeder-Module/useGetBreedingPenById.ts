import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getBreedingPenById(breedingPenId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_MODULE}/breeding-pens/${breedingPenId}`
  );
}

function useGetBreedingPenById(breedingPenId: string | undefined) {
  const query = useQuery({
    queryKey: ["breeding-pens", breedingPenId],
    queryFn: () => getBreedingPenById(breedingPenId),
    enabled: !!breedingPenId,
  });
  return query;
}
export default useGetBreedingPenById;
