import { useQuery } from "@tanstack/react-query";
import { API_URL_USERS } from "../constants/api";
import { ApiService } from "../services/api";
import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "../constants/time";

export async function getSessionUser() {
  const apiService = new ApiService();
  return await apiService.get(`${API_URL_USERS}/auth/info2`);
}

function useGetSessionUser() {
  const query = useQuery({
    queryKey: ["session-user"],
    queryFn: () => getSessionUser(),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  });
  return query;
}

export default useGetSessionUser;
