import { API_URL_BREEDER_MODULE } from "@/common/constants/api";
import { ApiService } from "@/common/services/api";
import { useMutation } from "@tanstack/react-query";

interface BreedingPair {
  broodCock: string;
  broodHen: string;
}

interface BreedingData {
  forBreeding: BreedingPair[];
}

export async function addForBreeding(data: BreedingData) {
  const apiService = new ApiService("main");
  return await apiService.post(
    `${API_URL_BREEDER_MODULE}/breeding-pens`,
    data
  );
}

function useAddForBreeding() {
  const query = useMutation({
    mutationFn: (data: BreedingData) => addForBreeding(data),
  });
  return query;
}

export default useAddForBreeding;
