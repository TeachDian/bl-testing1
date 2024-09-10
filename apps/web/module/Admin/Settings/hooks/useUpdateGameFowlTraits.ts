import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Traits } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlTraits(
  traitsId: string | undefined,
  props: T_Update_Game_Fowl_Traits
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/traits/${traitsId}`,
    props
  );
}

function useUpdateGameFowlTraits(traitsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Traits) =>
      updateGameFowlTraits(traitsId, props),
  });
  return query;
}

export default useUpdateGameFowlTraits;
