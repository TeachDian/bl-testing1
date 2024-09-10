import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Activity_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateActivityStatus(
  activityId: string | undefined,
  props: T_Update_Activity_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/activities/${activityId}/status`,
    props
  );
}

function useUpdateActivityStatus(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Status) =>
      updateActivityStatus(activityId, props),
  });
  return query;
}

export default useUpdateActivityStatus;
