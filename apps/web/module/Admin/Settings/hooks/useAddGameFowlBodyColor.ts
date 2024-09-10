import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Body_Color } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlBodyColor(props: T_Game_Fowl_Body_Color) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/body-color`, props);
}

function useAddGameFowlBodyColor() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Body_Color) => addGameFowlBodyColor(props),
  });
  return query;
}

export default useAddGameFowlBodyColor;
