import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteSlider(sliderId: string) {
  const apiService = new ApiService();
  return await apiService.delete(`${API_URL_WEB_CONTENTS}/sliders/${sliderId}`);
}

function useDeleteSlider(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (sliderId: string) => deleteSlider(sliderId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteSlider;
