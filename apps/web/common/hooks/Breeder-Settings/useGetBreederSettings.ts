import { API_URL_BREEDER_SETTINGS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getBreederSettings() {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_SETTINGS}/`);
}

function useGetBreederSettings() {
  const query = useQuery({
    queryKey: ["breeder-settings"],
    queryFn: () => getBreederSettings(),
  });
  return query;
}
export default useGetBreederSettings;
