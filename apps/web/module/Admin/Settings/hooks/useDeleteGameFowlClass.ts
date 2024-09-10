import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteGameFowlClass(classId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_BREEDER_SETTINGS}/class/${classId}`
  );
}

function useDeleteGameFowlClass(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (classId: string) => deleteGameFowlClass(classId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteGameFowlClass;
