import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Slider_Status } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateSliderStatus(
  sliderId: string | undefined,
  props: T_Update_Slider_Status
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/sliders/${sliderId}/status`,
    props
  );
}

function useUpdateSliderStatus(sliderId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Slider_Status) =>
      updateSliderStatus(sliderId, props),
  });
  return query;
}

export default useUpdateSliderStatus;
