import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getVideoById(videoId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/videos/${videoId}`
  );
}

function useGetVideoByid(videoId: string | undefined) {
  const query = useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
  });
  return query;
}
export default useGetVideoByid;
