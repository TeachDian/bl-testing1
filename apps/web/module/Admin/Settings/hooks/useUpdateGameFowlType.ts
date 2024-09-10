import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Type } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlType(
  typeId: string | undefined,
  props: T_Update_Game_Fowl_Type
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/type/${typeId}`,
    props
  );
}

function useUpdateGameFowlType(seasonId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Type) =>
      updateGameFowlType(seasonId, props),
  });
  return query;
}

export default useUpdateGameFowlType;
