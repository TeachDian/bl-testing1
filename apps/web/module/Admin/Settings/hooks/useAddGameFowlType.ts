import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Type } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlType(props: T_Game_Fowl_Type) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/type`, props);
}

function useAddGameFowlType() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Type) => addGameFowlType(props),
  });
  return query;
}

export default useAddGameFowlType;
