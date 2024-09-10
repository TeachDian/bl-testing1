import { API_URL_MICROCHIP } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Microchip } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addMicrochipId(props: T_Microchip) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_MICROCHIP}/ids`, props);
}

function useAddMicrochipId() {
  const query = useMutation({
    mutationFn: (props: T_Microchip) => addMicrochipId(props),
  });
  return query;
}

export default useAddMicrochipId;
