import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Breeding_Season } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateBreedingSeason(
  seasonId: string | undefined,
  props: T_Update_Breeding_Season
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/breeding-season/${seasonId}`,
    props
  );
}

function useUpdateBreedingSeason(seasonId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Breeding_Season) =>
      updateBreedingSeason(seasonId, props),
  });
  return query;
}

export default useUpdateBreedingSeason;
