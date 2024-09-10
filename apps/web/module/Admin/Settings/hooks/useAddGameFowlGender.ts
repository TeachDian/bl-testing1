import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Gender } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlGender(props: T_Game_Fowl_Gender) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/gender`, props);
}

function useAddGameFowlGender() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Gender) => addGameFowlGender(props),
  });
  return query;
}

export default useAddGameFowlGender;
