"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucideBookText, LucideLibrarySquare, LucidePenLine, LucideSquareGantt } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useUpdateGameFowlSkillsCategory from "../hooks/useUpdateGameFowlSkillsCategory";
import { T_Update_Game_Fowl_Skills_Category } from "@repo/contract";
import useGetGameFowlSkillsCategoryById from "../hooks/useGetGameFowlSkillsCategoryById";

const EditSkillsCategory = () => {
  const params = useParams<{ skillsCategoryId: string }>();
  const skillsCategoryId = params.skillsCategoryId;
  const { mutateAsync: updateSkillsCategory } =
    useUpdateGameFowlSkillsCategory(skillsCategoryId);
  const { setValue, register, handleSubmit } =
    useForm<T_Update_Game_Fowl_Skills_Category>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data, isPending } = useGetGameFowlSkillsCategoryById(skillsCategoryId);

  const onSubmit = async (formData: T_Update_Game_Fowl_Skills_Category) => {
    try {
      const response = await updateSkillsCategory(formData);
      console.log(response);
      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-skills-category/view`);
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
      setValue("skillsCategory", data.item.skillsCategory || " ");
    }
  }, [data, isPending, setValue]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideLibrarySquare />
          <Typography variant="h1" fontWeight="semiBold">
            Edit game fowl skills category
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update game fowl skills category
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
                      Skills category
                    </Typography>
                    <Input
                      placeholder="Enter game fowl skills category"
                      required
                      {...register("skillsCategory", {
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

export default EditSkillsCategory;
