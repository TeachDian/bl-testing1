import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlTraitsCategory(traitsCategoryId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/traits-category/${traitsCategoryId}`
  );
}

function useDeleteGameFowlTraitsCategory(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (traitsCategoryId: string) =>
      deleteGameFowlTraitsCategory(traitsCategoryId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlTraitsCategory;
