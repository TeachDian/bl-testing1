import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getSocialLinksById(socialId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/social-links/${socialId}`
  );
}

function useGetSocialLinksById(socialId: string | undefined) {
  const query = useQuery({
    queryKey: ["social-links", socialId],
    queryFn: () => getSocialLinksById(socialId),
    enabled: !!socialId,
  });
  return query;
}
export default useGetSocialLinksById;
