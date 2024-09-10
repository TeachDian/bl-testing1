import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Billboard_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateBillboardStatus(
  billboardId: string | undefined,
  props: T_Update_Billboard_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/billboards/${billboardId}/status`,
    props
  );
}

function useUpdateBillboardStatus(billboardId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Billboard_Status) =>
      updateBillboardStatus(billboardId, props),
  });
  return query;
}

export default useUpdateBillboardStatus;
