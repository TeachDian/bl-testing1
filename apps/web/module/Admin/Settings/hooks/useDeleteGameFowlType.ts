import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlType(typeId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_BREEDER_SETTINGS}/type/${typeId}`);
}

function useDeleteGameFowlType(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (typeId: string) => deleteGameFowlType(typeId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlType;
