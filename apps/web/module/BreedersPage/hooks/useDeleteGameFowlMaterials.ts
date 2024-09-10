import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlMaterials(gameFowlMaterialsId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_MODULE}/breeding-materials/${gameFowlMaterialsId}`
  );
}

function useDeleteGameFowlMaterials(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (gameFowlMaterialsId: string) =>
      deleteGameFowlMaterials(gameFowlMaterialsId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlMaterials;
