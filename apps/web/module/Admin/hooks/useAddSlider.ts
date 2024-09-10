import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Sliders } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addSlider(props: T_Sliders) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/sliders`, props);
}

function useAddSlider() {
  const query = useMutation({
    mutationFn: (props: T_Sliders) => addSlider(props),
  });
  return query;
}

export default useAddSlider;
