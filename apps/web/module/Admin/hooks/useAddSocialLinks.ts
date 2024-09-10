import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Social_Links } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addSocialLinks(props: T_Social_Links) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/social-links`, props);
}

function useAddSocialLinks() {
  const query = useMutation({
    mutationFn: (props: T_Social_Links) => addSocialLinks(props),
  });
  return query;
}

export default useAddSocialLinks;
