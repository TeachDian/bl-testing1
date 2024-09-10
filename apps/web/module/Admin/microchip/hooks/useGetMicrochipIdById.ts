import { API_URL_MICROCHIP } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getMicrochipIdById(mid: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_MICROCHIP}/ids/${mid}`);
}

function useGetMicrochipIdById(mid: string | undefined) {
  const query = useQuery({
    queryKey: ["ids", mid],
    queryFn: () => getMicrochipIdById(mid),
    enabled: !!mid,
  });
  return query;
}
export default useGetMicrochipIdById;
