import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlClassById(classId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/class/${classId}`);
}

function useGetGameFowlClassById(classId: string | undefined) {
  const query = useQuery({
    queryKey: ["class", classId],
    queryFn: () => getGameFowlClassById(classId),
    enabled: !!classId,
  });
  return query;
}
export default useGetGameFowlClassById;
