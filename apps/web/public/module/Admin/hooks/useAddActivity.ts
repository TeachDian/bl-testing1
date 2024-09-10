import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Activities } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addActivity(props: T_Activities) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/activities`, props);
}

function useAddActivity() {
  const query = useMutation({
    mutationFn: (props: T_Activities) => addActivity(props),
  });
  return query;
}

export default useAddActivity;
