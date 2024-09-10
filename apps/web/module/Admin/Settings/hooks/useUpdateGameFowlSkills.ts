import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Skills } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlSkills(
  skillsId: string | undefined,
  props: T_Update_Game_Fowl_Skills
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/skills/${skillsId}`,
    props
  );
}

function useUpdateGameFowlSkills(skillsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Skills) =>
      updateGameFowlSkills(skillsId, props),
  });
  return query;
}

export default useUpdateGameFowlSkills;
