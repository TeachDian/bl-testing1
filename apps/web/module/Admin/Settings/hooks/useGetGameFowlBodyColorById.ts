import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getGameFowlBodyColorById(
  bodyColorId: string | undefined
) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_BREEDER_SETTINGS}/body-color/${bodyColorId}`
  );
}

function useGetGameFowlBodyColorById(bodyColorId: string | undefined) {
  const query = useQuery({
    queryKey: ["body-color", bodyColorId],
    queryFn: () => getGameFowlBodyColorById(bodyColorId),
    enabled: !!bodyColorId,
  });
  return query;
}
export default useGetGameFowlBodyColorById;
