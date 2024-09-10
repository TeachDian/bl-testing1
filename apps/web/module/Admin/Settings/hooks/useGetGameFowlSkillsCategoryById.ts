import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlSkillsCategoryById(
  skillsCategoryId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/skills-category/${skillsCategoryId}`
  );
}

function useGetGameFowlSkillsCategoryById(
  skillsCategoryId: string | undefined
) {
  const query = useQuery({
    queryKey: ["skills-category", skillsCategoryId],
    queryFn: () => getGameFowlSkillsCategoryById(skillsCategoryId),
    enabled: !!skillsCategoryId,
  });
  return query;
}
export default useGetGameFowlSkillsCategoryById;
