import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_About_Us } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateAboutUs(props: T_About_Us) {
  const apiService = new ApiService("main");
  return await apiService.patch(`${API_URL_WEB_CONTENTS}/about-us`, props);
}

function useUpdateAboutUs() {
  const query = useMutation({
    mutationFn: (props: T_About_Us) => updateAboutUs(props),
  });
  return query;
}

export default useUpdateAboutUs;
