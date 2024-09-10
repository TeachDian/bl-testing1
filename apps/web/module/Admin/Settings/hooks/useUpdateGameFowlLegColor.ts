import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Leg_Color } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlLegColor(
  legColorId: string | undefined,
  props: T_Update_Game_Fowl_Leg_Color
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/leg-color/${legColorId}`,
    props
  );
}

function useUpdateGameFowlLegColor(legColorId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Leg_Color) =>
      updateGameFowlLegColor(legColorId, props),
  });
  return query;
}

export default useUpdateGameFowlLegColor;
