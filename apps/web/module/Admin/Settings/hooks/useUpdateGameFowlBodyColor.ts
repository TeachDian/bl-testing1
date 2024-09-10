import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Body_Color } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlBodyColor(
  bodyColorId: string | undefined,
  props: T_Update_Game_Fowl_Body_Color
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/body-color/${bodyColorId}`,
    props
  );
}

function useUpdateGameFowlBodyColor(bodyColorId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Body_Color) =>
      updateGameFowlBodyColor(bodyColorId, props),
  });
  return query;
}

export default useUpdateGameFowlBodyColor;
