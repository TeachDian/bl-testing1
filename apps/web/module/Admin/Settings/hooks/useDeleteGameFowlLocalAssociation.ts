import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlLocalAssociation(associationId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/local-association/${associationId}`
  );
}

function useDeleteGameFowlLocalAssociation(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (associationId: string) =>
      deleteGameFowlLocalAssociation(associationId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlLocalAssociation;
