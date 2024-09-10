import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Videos } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addVideo(props: T_Videos) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/news`, props);
}

function useAddVideo() {
  const query = useMutation({
    mutationFn: (props: T_Videos) => addVideo(props),
  });
  return query;
}

export default useAddVideo;
