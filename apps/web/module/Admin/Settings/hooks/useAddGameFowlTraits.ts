import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Traits } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlTraits(props: T_Game_Fowl_Traits) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/traits`, props);
}

function useAddGameFowlTraits() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Traits) => addGameFowlTraits(props),
  });
  return query;
}

export default useAddGameFowlTraits;
