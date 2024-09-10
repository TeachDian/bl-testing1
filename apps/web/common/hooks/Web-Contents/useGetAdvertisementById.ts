import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getAdvertisementById(advertisementsId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/billboards/${advertisementsId}`
  );
}

function useGetAdvertisementById(advertisementsId: string | undefined) {
  const query = useQuery({
    queryKey: ["advertisement", advertisementsId],
    queryFn: () => getAdvertisementById(advertisementsId),
    enabled: !!advertisementsId,
  });
  return query;
}
export default useGetAdvertisementById;
