import { API_URL_MICROCHIP } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Microchip_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateMicrochipIdStatus(
  mid: string | undefined,
  props: T_Update_Microchip_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(`${API_URL_MICROCHIP}/status/${mid}`, props);
}

function useUpdateMicrochipIdStatus(mid: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Microchip_Status) =>
      updateMicrochipIdStatus(mid, props),
  });
  return query;
}

export default useUpdateMicrochipIdStatus;
