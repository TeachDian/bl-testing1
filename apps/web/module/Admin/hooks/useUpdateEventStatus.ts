import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Event_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateEventStatus(
  eventId: string | undefined,
  props: T_Update_Event_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/events/${eventId}/status`,
    props
  );
}

function useUpdateEventStatus(eventId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Event_Status) =>
      updateEventStatus(eventId, props),
  });
  return query;
}

export default useUpdateEventStatus;
