import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_News } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addNews(props: T_News) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/news`, props);
}

function useAddNews() {
  const query = useMutation({
    mutationFn: (props: T_News) => addNews(props),
  });
  return query;
}

export default useAddNews;
