import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getWebContents() {
  const apiService = new ApiService("main");
  return await apiService.get(`${API_URL_WEB_CONTENTS}/`);
}

function useGetWebContents() {
  const query = useQuery({
    queryKey: ["web-contents"],
    queryFn: () => getWebContents(),
  });
  return query;
}
export default useGetWebContents;