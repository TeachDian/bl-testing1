import { API_URL_WEB_CONTENTS } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

export async function deleteSocialLinks(socialId: string) {
  const apiService = new ApiService();
  return await apiService.delete(
    `${API_URL_WEB_CONTENTS}/activities/${socialId}`
  );
}

function useDeleteSocialLinks(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: (socialId: string) => deleteSocialLinks(socialId),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
}

export default useDeleteSocialLinks;
