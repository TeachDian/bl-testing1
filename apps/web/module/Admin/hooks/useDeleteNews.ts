import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteNews(newsId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_WEB_CONTENTS}/news/${newsId}`);
}

function useDeleteNews(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (newsId: string) => deleteNews(newsId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteNews;
