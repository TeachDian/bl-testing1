import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_About_Us } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addAboutUs(props: T_About_Us) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/about-us`, props);
}

function useAddAboutUs() {
  const query = useMutation({
    mutationFn: (props: T_About_Us) => addAboutUs(props),
  });
  return query;
}

export default useAddAboutUs;
