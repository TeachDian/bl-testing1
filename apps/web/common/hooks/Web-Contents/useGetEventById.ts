import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getEventById(eventId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/events/${eventId}`
  );
}

function useGetEventById(eventId: string | undefined) {
  const query = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
  return query;
}
export default useGetEventById;
