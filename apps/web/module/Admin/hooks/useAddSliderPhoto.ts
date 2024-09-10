import { useMutation } from "@tanstack/react-query";
import { T_Photo } from "@repo/contract";
import { ApiService } from "@/common/services/api";
import { API_URL_WEB_CONTENTS } from "@/common/constants/api";

export async function addSliderPhoto(
  sliderId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData();
  formData.append("file", props.file as File);
  formData.append("isMain", String(props.isMain));
  formData.append("description", props.description);
  formData.append("tags", props.tags);
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_WEB_CONTENTS}/sliders/${sliderId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  );
}

function useAddSliderPhoto(sliderId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => addSliderPhoto(sliderId, props),
  });
  return query;
}
export default useAddSliderPhoto;
