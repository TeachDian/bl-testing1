import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Sliders } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateSlider(
  sliderId: string | undefined,
  props: T_Update_Sliders
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_WEB_CONTENTS}/sliders/${sliderId}`,
    props
  );
}

function useUpdateSlider(sliderId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Sliders) => updateSlider(sliderId, props),
  });
  return query;
}

export default useUpdateSlider;
