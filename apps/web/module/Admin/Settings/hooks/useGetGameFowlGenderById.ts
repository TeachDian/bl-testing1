import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlGenderById(genderId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/gender/${genderId}`);
}

function useGetGameFowlGenderById(genderId: string | undefined) {
  const query = useQuery({
    queryKey: ["body-color", genderId],
    queryFn: () => getGameFowlGenderById(genderId),
    enabled: !!genderId,
  });
  return query;
}
export default useGetGameFowlGenderById;
