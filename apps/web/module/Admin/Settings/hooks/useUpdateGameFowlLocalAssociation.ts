import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Local_Association } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlLocalAssociation(
  associationId: string | undefined,
  props: T_Update_Game_Fowl_Local_Association
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/local-association/${associationId}`,
    props
  );
}

function useUpdateGameFowlLocalAssociation(associationId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Local_Association) =>
      updateGameFowlLocalAssociation(associationId, props),
  });
  return query;
}

export default useUpdateGameFowlLocalAssociation;
