import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteVideos(videosId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_WEB_CONTENTS}/videos/${videosId}`);
}

function useDeleteVideos(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (videosId: string) => deleteVideos(videosId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteVideos;
