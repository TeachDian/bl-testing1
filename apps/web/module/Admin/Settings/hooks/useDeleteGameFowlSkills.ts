import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlSkills(skillsId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/skills/${skillsId}`
  );
}

function useDeleteGameFowlSkills(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (skillsId: string) => deleteGameFowlSkills(skillsId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlSkills;
