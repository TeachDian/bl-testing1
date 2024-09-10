import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlStatus(
  statusId: string | undefined,
  props: T_Update_Game_Fowl_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/status/${statusId}`,
    props
  );
}

function useUpdateGameFowlStatus(statusId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Status) =>
      updateGameFowlStatus(statusId, props),
  });
  return query;
}

export default useUpdateGameFowlStatus;
