import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Skills_Category } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlSkillsCategory(
  props: T_Game_Fowl_Skills_Category
) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_SETTINGS}/skills-category`,
    props
  );
}

function useAddGameFowlSkillsCategory() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Skills_Category) =>
      addGameFowlSkillsCategory(props),
  });
  return query;
}

export default useAddGameFowlSkillsCategory;
