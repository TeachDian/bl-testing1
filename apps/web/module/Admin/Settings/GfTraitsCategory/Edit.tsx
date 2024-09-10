"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucideLibrarySquare, LucidePenLine,  } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { T_Game_Fowl_Traits_Category } from "@repo/contract";
import useUpdateGameFowlTraitsCategory from "../hooks/useUpdateGameFowlTraitsCategory";
import useGetGameFowlTraitsCategory from "../hooks/useGetGameFowlTraitsCategoryById";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const index = () => {
  const params = useParams<{ traitsCategoryId: string }>();
  const traitsCategoryId = params.traitsCategoryId;
  const { mutateAsync: updateTraitsCategory } =
  useUpdateGameFowlTraitsCategory(traitsCategoryId);
  const { setValue, register, handleSubmit } =
    useForm<T_Game_Fowl_Traits_Category>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data, isPending } = useGetGameFowlTraitsCategory(traitsCategoryId);

  const onSubmit = async (formData: T_Game_Fowl_Traits_Category) => {
    try {
      const modifiedFormData = {
        ...formData,
        traitsCategory: capitalizeFirstLetter(formData.traitsCategory),

      };
      const response = await updateTraitsCategory(modifiedFormData);
      console.log(response);
      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-traits-category/view`);
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(String(err));
    }
  };

  useEffect(() => {
    if (!isPending && data?.item) {
      const item = data.item;
      setValue("traitsCategory", data.item.traitsCategory || " ");
    }
  }, [data, isPending, setValue]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideLibrarySquare />
          <Typography variant="h1" fontWeight="semiBold">
            Edit game fowl traits category
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update game fowl traits category
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
                      traits category
                    </Typography>
                    <Input
                      placeholder="Enter game fowl traits category"
                      required
                      {...register("traitsCategory", {
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

export default index;
