import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteBreedingSeason(seasonId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/breeding-season/${seasonId}`
  );
}

function useDeleteBreedingSeason(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (seasonId: string) => deleteBreedingSeason(seasonId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteBreedingSeason;
