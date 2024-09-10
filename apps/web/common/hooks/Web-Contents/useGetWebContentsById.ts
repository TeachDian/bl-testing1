import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getWebContentsById(contentId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_WEB_CONTENTS}/${contentId}`);
}

function useGetWebContentsById(contentId: string | undefined) {
  const query = useQuery({
    queryKey: ["web-contents", contentId],
    queryFn: () => getWebContentsById(contentId),
    enabled: !!contentId,
  });
  return query;
}
export default useGetWebContentsById;