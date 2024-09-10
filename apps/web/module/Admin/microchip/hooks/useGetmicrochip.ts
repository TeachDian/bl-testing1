import { API_URL_MICROCHIP } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getMicrochipIds() {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_MICROCHIP}/ids`);
}

function useGetMicrochipIds() {
  const query = useQuery({
    queryKey: ["ids"],
    queryFn: () => getMicrochipIds(),
  });
  return query;
}
export default useGetMicrochipIds;