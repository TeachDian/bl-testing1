import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Materials } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlMaterials(
  gameFowlMaterialsId: string | undefined,
  props: T_Update_Game_Fowl_Materials
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_MODULE}/breeding-materials/${gameFowlMaterialsId}`,
    props
  );
}

function useUpdateGameFowlMaterials(gameFowlMaterialsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Materials) =>
      updateGameFowlMaterials(gameFowlMaterialsId, props),
  });
  return query;
}

export default useUpdateGameFowlMaterials;
