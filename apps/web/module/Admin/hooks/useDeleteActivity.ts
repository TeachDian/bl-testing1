import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteActivity(activityId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_WEB_CONTENTS}/activities/${activityId}`);
}

function useDeleteActivity(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (activityId: string) => deleteActivity(activityId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteActivity;
