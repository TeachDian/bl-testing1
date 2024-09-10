import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useQuery } from "@tanstack/react-query";

export async function getActivityById(sliderId: string | undefined) {
  const apiService = new ApiService("main");
  return await apiService.get(
    `${API_URL_WEB_CONTENTS}/sliders/${sliderId}`
  );
}

function useGetSliderById(sliderId: string | undefined) {
  const query = useQuery({
    queryKey: ["sliders", sliderId],
    queryFn: () => getActivityById(sliderId),
    enabled: !!sliderId,
  });
  return query;
}
export default useGetSliderById;
