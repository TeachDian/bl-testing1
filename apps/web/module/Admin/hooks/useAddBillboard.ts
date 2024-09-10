import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Billboards } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addBillboard(props: T_Billboards) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/billboards`, props);
}

function useAddBillboard() {
  const query = useMutation({
    mutationFn: (props: T_Billboards) => addBillboard(props),
  });
  return query;
}

export default useAddBillboard;
