import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlLegColor(legColorId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/leg-color//${legColorId}`
  );
}

function useDeleteGameFowlLegColor(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (legColorId: string) => deleteGameFowlLegColor(legColorId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlLegColor;
