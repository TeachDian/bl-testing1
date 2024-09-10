import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Federation } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlFederation(props: T_Game_Fowl_Federation) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/federation`, props);
}

function useAddGameFowlFederation() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Federation) => addGameFowlFederation(props),
  });
  return query;
}

export default useAddGameFowlFederation;
