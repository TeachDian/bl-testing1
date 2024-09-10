import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { T_Events } from "@repo/contract";
import { useMutation } from "@tanstack/react-query";

export async function addEvent(props: T_Events) {
  const apiService = new ApiService("main");
  return await apiService.post(`${API_URL_WEB_CONTENTS}/events`, props);
}

function useAddEvent() {
  const query = useMutation({
    mutationFn: (props: T_Events) => addEvent(props),
  });
  return query;
}

export default useAddEvent;
