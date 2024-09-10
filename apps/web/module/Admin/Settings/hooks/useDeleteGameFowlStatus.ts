import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlStatus(statusId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/status/${statusId}`
  );
}

function useDeleteGameFowlStatus(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (statusId: string) => deleteGameFowlStatus(statusId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlStatus;
