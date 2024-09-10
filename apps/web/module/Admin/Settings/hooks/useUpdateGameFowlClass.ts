import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Class } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlClass(
  classId: string | undefined,
  props: T_Update_Game_Fowl_Class
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/class/${classId}`,
    props
  );
}

function useUpdateGameFowlClass(seasonId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Class) =>
      updateGameFowlClass(seasonId, props),
  });
  return query;
}

export default useUpdateGameFowlClass;
