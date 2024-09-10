import { useMutation } from "@tanstack/react-query";
import { T_Photo } from "@repo/contract";
import { ApiService } from "@/common/services/api";
import { API_URL_WEB_CONTENTS } from "@/common/constants/api";

export async function addActivityPhoto(
  activityId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData();
  formData.append("file", props.file as File);
  formData.append("isMain", String(props.isMain));
  formData.append("description", props.description);
  formData.append("tags", props.tags);
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_WEB_CONTENTS}/activities/${activityId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  );
}

function useAddActivityPhoto(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => addActivityPhoto(activityId, props),
  });
  return query;
}
export default useAddActivityPhoto;
