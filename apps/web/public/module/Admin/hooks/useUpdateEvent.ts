import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Events } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateEvent(
  eventId: string | undefined,
  props: T_Events
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/events/${eventId}`,
    props
  );
}

function useUpdateEvent(eventId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Events) => updateEvent(eventId, props),
  });
  return query;
}

export default useUpdateEvent;
