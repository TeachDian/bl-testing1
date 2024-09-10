import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlGender(genderId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/gender/${genderId}`
  );
}

function useDeleteGameFowlGender(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (genderId: string) => deleteGameFowlGender(genderId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlGender;
