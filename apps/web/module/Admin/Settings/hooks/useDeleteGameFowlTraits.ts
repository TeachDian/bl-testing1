import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlTraits(traitsId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/traits/${traitsId}`
  );
}

function useDeleteGameFowlTraits(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (traitsId: string) => deleteGameFowlTraits(traitsId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlTraits;
