import { useMutation } from "@tanstack/react-query";
import { ApiService } from "@/common/services/api";
import { API_URL_MICROCHIP } from "@/common/constants/api";

export async function uploadMicrochipCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_MICROCHIP}/upload-microchip-csv`,
    formData,
    true,
    true
  );
}

function useUploadMicrochipCSV() {
  const mutation = useMutation({
    mutationFn: (file: File) => uploadMicrochipCSV(file),
  });
  return mutation;
}

export default useUploadMicrochipCSV;
