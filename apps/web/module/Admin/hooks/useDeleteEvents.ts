import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteEvent(eventId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_WEB_CONTENTS}/events/${eventId}`);
}

function useDeleteEvent(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteEvent;
