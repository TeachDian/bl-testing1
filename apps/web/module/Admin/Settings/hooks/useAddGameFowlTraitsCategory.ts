import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Game_Fowl_Traits_Category } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addGameFowlTraitsCategory(
  props: T_Game_Fowl_Traits_Category
) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_SETTINGS}/traits-category`,
    props
  );
}

function useAddGameFowlTraitsCategory() {
  const query = useMutation({
    mutationFn: (props: T_Game_Fowl_Traits_Category) =>
      addGameFowlTraitsCategory(props),
  });
  return query;
}

export default useAddGameFowlTraitsCategory;
