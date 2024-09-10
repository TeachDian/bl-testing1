import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Leg_Color } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlLegColor(props: T_Game_Fowl_Leg_Color) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/leg-color`, props);
}

function useAddGameFowlLegColor() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Leg_Color) => addGameFowlLegColor(props),
  });
  return query;
}

export default useAddGameFowlLegColor;
