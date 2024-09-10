import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Federation } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlFederation(
  federationId: string | undefined,
  props: T_Update_Game_Fowl_Federation
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/federation/${federationId}`,
    props
  );
}

function useUpdateGameFowlFederation(federationId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Federation) =>
      updateGameFowlFederation(federationId, props),
  });
  return query;
}

export default useUpdateGameFowlFederation;
