import { API_URL_MICROCHIP } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Microchip } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateMicrochipId(
  mid: string | undefined,
  props: T_Microchip
) {
  const apiService = new ApiService("main");
  return await apiService.patch(`${API_URL_MICROCHIP}/ids/${mid}`, props);
}

function useUpdateMicrochipId(mid: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Microchip) => updateMicrochipId(mid, props),
  });
  return query;
}

export default useUpdateMicrochipId;
