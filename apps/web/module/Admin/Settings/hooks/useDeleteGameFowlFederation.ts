import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlFederation(federationId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/federation/${federationId}`
  );
}

function useDeleteGameFowlFederation(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (federationId: string) =>
      deleteGameFowlFederation(federationId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlFederation;
