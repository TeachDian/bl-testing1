import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlSkillsCategory(skillsCategoryId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/skills-category/${skillsCategoryId}`
  );
}

function useDeleteGameFowlSkillsCategory(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (skillsCategoryId: string) =>
      deleteGameFowlSkillsCategory(skillsCategoryId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlSkillsCategory;
