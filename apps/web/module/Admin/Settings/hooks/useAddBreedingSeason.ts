import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Breeding_Season } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addBreedingSeason(props: T_Breeding_Season) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_SETTINGS}/breeding-season`,
    props
  );
}

function useAddBreedingSeason() {
  const query = useMutation({
    mutationFn: (props: T_Breeding_Season) => addBreedingSeason(props),
  });
  return query;
}

export default useAddBreedingSeason;
