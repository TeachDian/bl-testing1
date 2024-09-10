import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteBreedingPen(breedingPenId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_MODULE}/breeding-pens/${breedingPenId}`
  );
}

function useDeleteBreedingPen(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (breedingPenId: string) => deleteBreedingPen(breedingPenId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteBreedingPen;
