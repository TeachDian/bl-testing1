import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_News } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateNews(
  newsId: string | undefined,
  props: T_Update_News
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/news/${newsId}`,
    props
  );
}

function useUpdateNews(newsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_News) => updateNews(newsId, props),
  });
  return query;
}

export default useUpdateNews;
