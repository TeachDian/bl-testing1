import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getBreederModule() {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_BREEDER_MODULE}/`);
}

function useGetBreederModule() {
  const query = useQuery({
    queryKey: ["breeder-module"],
    queryFn: () => getBreederModule(),
  });
  return query;
}
export default useGetBreederModule;
