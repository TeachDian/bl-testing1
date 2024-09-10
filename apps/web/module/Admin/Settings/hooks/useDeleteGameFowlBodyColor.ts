import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlBodyColor(bodyColorId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/body-color/${bodyColorId}`
  );
}

function useDeleteGameFowlBodyColor(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (bodyColorId: string) => deleteGameFowlBodyColor(bodyColorId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlBodyColor;
