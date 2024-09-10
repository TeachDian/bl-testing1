import { useMutation } from "@tanstack/react-query";
import { T_Photo } from "@repo/contract";
import { ApiService } from "@/common/services/api";
import { API_URL_BREEDER_MODULE } from "@/common/constants/api";

export async function addGameFowlMaterialsPhoto(
  gameFowlMaterialsId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData();
  formData.append("file", props.file as File);
  formData.append("isMain", String(props.isMain));
  formData.append("description", props.description);
  formData.append("tags", props.tags);
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_MODULE}/breeding-materials/${gameFowlMaterialsId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  );
}

function useAddGameFowlMaterialsPhoto(gameFowlMaterialsId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) =>
      addGameFowlMaterialsPhoto(gameFowlMaterialsId, props),
  });
  return query;
}
export default useAddGameFowlMaterialsPhoto;
