import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Class } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlClass(props: T_Game_Fowl_Class) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_BREEDER_SETTINGS}/class`, props);
}

function useAddGameFowlClass() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Class) => addGameFowlClass(props),
  });
  return query;
}

export default useAddGameFowlClass;
