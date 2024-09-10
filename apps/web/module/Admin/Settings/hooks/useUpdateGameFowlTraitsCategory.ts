import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Update_Game_Fowl_Traits_Category } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function updateGameFowlTraitsCategory(
  traitsCategoryId: string | undefined,
  props: T_Update_Game_Fowl_Traits_Category
) {
  const apiService = new ApiService("main");
  return await apiService.patch(
    `${API_URL_BREEDER_SETTINGS}/traits-category/${traitsCategoryId}`,
    props
  );
}

function useUpdateGameFowlTraitsCategory(traitsCategoryId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Game_Fowl_Traits_Category) =>
      updateGameFowlTraitsCategory(traitsCategoryId, props),
  });
  return query;
}

export default useUpdateGameFowlTraitsCategory;
