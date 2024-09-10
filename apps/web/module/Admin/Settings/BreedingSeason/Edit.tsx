"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucidePenLine, LucideSunSnow } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useUpdateBreedingSeason from "../hooks/useUpdateBreedingSeason"; // Correct hook import
import { T_Breeding_Season } from "@repo/contract";
import useGetBreedingSeasonById from "../hooks/useGetBreedingSeasonById";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const EditBreedingSeason = () => {
  const params = useParams<{ seasonId: string }>();
  const seasonId = params.seasonId; // This will give you the seasonId from the route
  const { data, isPending } = useGetBreedingSeasonById(seasonId);
  
  // Pass the seasonId to the hook
  const { mutateAsync: updateBreedingSeason } = useUpdateBreedingSeason(seasonId);
  
  const { register, handleSubmit, setValue } = useForm<T_Breeding_Season>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: T_Breeding_Season) => {
    try {
      setIsLoading(true);

      const modifiedFormData = {
        ...formData,
        breedingSeasonTitle: capitalizeFirstLetter(
          formData.breedingSeasonTitle
        ),
      };

      // Call the mutation with the form data
      const response = await updateBreedingSeason(modifiedFormData);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/breeding-season/view`);
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && data?.item) {
      const item = data.item;
      setValue("breedingSeasonTitle", item.breedingSeasonTitle || "");
    }
  }, [data, isPending, setValue]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideSunSnow />
          <Typography variant="h1" fontWeight="semiBold">
            Edit Breeding Category
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update Breeding category
            </Typography>
          </div>
          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex-grow flex flex-col justify-between"
              >
                <div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Breeding category title
                    </Typography>
                    <Input
                      placeholder="Enter Breeding category title"
                      required
                      {...register("breedingSeasonTitle", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button
                  className="mt-4 self-start w-32"
                  variant="default"
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="md" /> : "Update"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default EditBreedingSeason;
