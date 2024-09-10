import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Videos } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateVideo(
  videoId: string | undefined,
  props: T_Videos
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/videos/${videoId}`,
    props
  );
}

function useUpdateVideo(videoId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Videos) => updateVideo(videoId, props),
  });
  return query;
}

export default useUpdateVideo;
