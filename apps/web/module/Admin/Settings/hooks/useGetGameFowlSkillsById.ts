import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlSkillsById(skillsId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/skills/${skillsId}`);
}

function useGetGameFowlSkillsById(skillsId: string | undefined) {
  const query = useQuery({
    queryKey: ["skills", skillsId],
    queryFn: () => getGameFowlSkillsById(skillsId),
    enabled: !!skillsId,
  });
  return query;
}
export default useGetGameFowlSkillsById;
