import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Gender } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlGender(
  genderId: string | undefined,
  props: T_Update_Game_Fowl_Gender
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/gender/${genderId}`,
    props
  );
}

function useUpdateGameFowlGender(genderId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Gender) =>
      updateGameFowlGender(genderId, props),
  });
  return query;
}

export default useUpdateGameFowlGender;
