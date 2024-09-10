import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Skills } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlSkills(props: T_Game_Fowl_Skills) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/skills`, props);
}

function useAddGameFowlSkills() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Skills) => addGameFowlSkills(props),
  });
  return query;
}

export default useAddGameFowlSkills;
