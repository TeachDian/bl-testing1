import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getAllGameFowlMaterials() {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_MODULE}/breeding-materials`);
}

function useGetAllGameFowlMaterials() {
  const query = useQuery({
    queryKey: ["breeding-materials"],
    queryFn: () => getAllGameFowlMaterials(),
  });
  return query;
}
export default useGetAllGameFowlMaterials;