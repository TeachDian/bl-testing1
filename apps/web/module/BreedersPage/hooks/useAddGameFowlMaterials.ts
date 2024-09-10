import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Materials } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlMaterials(props: T_Game_Fowl_Materials) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_MODULE}/breeding-materials`,
    props
  );
}

function useAddGameFowlMaterials() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Materials) => addGameFowlMaterials(props),
  });
  return query;
}

export default useAddGameFowlMaterials;
