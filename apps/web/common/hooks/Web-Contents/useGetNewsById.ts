import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getNewsById(newsId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/news/${newsId}`
  );
}

function useGetNewsById(newsId: string | undefined) {
  const query = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getNewsById(newsId),
    enabled: !!newsId,
  });
  return query;
}
export default useGetNewsById;
