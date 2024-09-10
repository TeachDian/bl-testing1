import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Skills_Category } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlSkillsCategory(
  skillsCategoryId: string | undefined,
  props: T_Update_Game_Fowl_Skills_Category
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/skills-category/${skillsCategoryId}`,
    props
  );
}

function useUpdateGameFowlSkillsCategory(skillsCategoryId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Skills_Category) =>
      updateGameFowlSkillsCategory(skillsCategoryId, props),
  });
  return query;
}

export default useUpdateGameFowlSkillsCategory;
