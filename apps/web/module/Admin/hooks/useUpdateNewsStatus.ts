import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_News_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateNewsStatus(
  newsId: string | undefined,
  props: T_Update_News_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/news/${newsId}/status`,
    props
  );
}

function useUpdateNewsStatus(newsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_News_Status) =>
      updateNewsStatus(newsId, props),
  });
  return query;
}

export default useUpdateNewsStatus;
