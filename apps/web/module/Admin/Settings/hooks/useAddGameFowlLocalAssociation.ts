import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Local_Association } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlLocalAssociation(
  props: T_Game_Fowl_Local_Association
) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_SETTINGS}/local-association`,
    props
  );
}

function useAddGameFowlLocalAssociation() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Local_Association) =>
      addGameFowlLocalAssociation(props),
  });
  return query;
}

export default useAddGameFowlLocalAssociation;
