import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Activities } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateActivity(
  activityId: string | undefined,
  props: T_Activities
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/activities/${activityId}`,
    props
  );
}

function useUpdateActivity(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activities) => updateActivity(activityId, props),
  });
  return query;
}

export default useUpdateActivity;
