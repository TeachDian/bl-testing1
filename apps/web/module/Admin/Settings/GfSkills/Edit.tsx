"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useUpdateGameFowlSkills from "../hooks/useUpdateGameFowlSkills";
import useGetGameFowlSkillsById from "../hooks/useGetGameFowlSkillsById";
import Dropdown, {
  DropdownItem,
} from "@/module/LandingPage/components/DropDown";
import { LucidePenLine, LucideDna, LucideBookOpen } from "lucide-react";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const EditGameFowlSkills = () => {
  const params = useParams<{ skillsId: string }>();
  const skillsId = params.skillsId;
  const { mutateAsync: updateGameFowlSkills } =
    useUpdateGameFowlSkills(skillsId);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTypeOrBreed, setSelectedTypeOrBreed] =
    useState<DropdownItem | null>(null);
  const [selectedSkillsCategory, setSelectedSkillsCategory] =
    useState<DropdownItem | null>(null);

  const { data: breederData, isPending: breederPending } =
    useGetBreederSettings();
  const { data: skillsData, isPending: skillsPending } =
    useGetGameFowlSkillsById(skillsId);

  const typeData: DropdownItem[] = (
    breederData?.items[0]?.gameFowlType || []
  ).map((item: any) => ({
    _id: item._id,
    item: item.gameFowlType,
    value: item._id,
  }));

  const skillsCategoryData: DropdownItem[] = (
    breederData?.items[0]?.gameFowlSkillsCategory || []
  ).map((item: any) => ({
    _id: item._id,
    item: item.skillsCategory,
    value: item._id,
  }));

  useEffect(() => {
    if (!skillsPending && skillsData?.item) {
      const item = skillsData.item;

      // Populate form fields
      const cleanedSkillsSet = item.gameFowlSkillSet.replace(/[""]/g, "");
      if (!getValues("gameFowlSkillSet")) {
        setValue("gameFowlSkillSet", cleanedSkillsSet);
      }

      // Set dropdown selections
      const selectedType =
        typeData.find((type) => type._id === item.gameFowlType._id) || null;
      const selectedCategory =
        skillsCategoryData.find(
          (category) => category._id === item.gameFowlSkillsCategory._id
        ) || null;

      if (!selectedTypeOrBreed) setSelectedTypeOrBreed(selectedType);
      if (!selectedSkillsCategory) setSelectedSkillsCategory(selectedCategory);
    }
  }, [
    skillsData,
    skillsPending,
    setValue,
    typeData,
    skillsCategoryData,
    selectedTypeOrBreed,
    selectedSkillsCategory,
    getValues,
  ]);

  const onSubmit = async (formData: any) => {
    try {
      const modifiedFormData = {
        ...formData,
        gameFowlSkillSet: capitalizeFirstLetter(formData.gameFowlSkillSet),
      };
      setIsLoading(true);
      const gameFowlType = selectedTypeOrBreed?._id ?? "";
      const gameFowlSkillsCategory = selectedSkillsCategory?._id ?? "";

      if (!gameFowlType || !gameFowlSkillsCategory) {
        throw new Error(
          "Please select both game fowl type and skills category"
        );
      }

      const dataToSubmit = {
        ...modifiedFormData,
        gameFowlType,
        gameFowlSkillsCategory,
      };

      const response = await updateGameFowlSkills(dataToSubmit);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-skills/view`);
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

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideDna />
          <Typography variant="h1" fontWeight="semiBold">
            Edit Game Fowl Skills
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update game fowl skills
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
                      Game fowl type
                    </Typography>
                    {typeData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={typeData}
                        selectedItem={selectedTypeOrBreed}
                        onSelectItem={(item) => setSelectedTypeOrBreed(item)}
                        placeholder="Select type or breed"
                      />
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game fowl skills category
                    </Typography>
                    {skillsCategoryData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={skillsCategoryData}
                        selectedItem={selectedSkillsCategory}
                        onSelectItem={(item) =>
                          setSelectedSkillsCategory(item)
                        }
                        placeholder="Select skills category"
                      />
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game fowl skill set
                    </Typography>
                    <Input
                      placeholder="Enter game fowl skill set"
                      required
                      {...register("gameFowlSkillSet", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                    {errors.gameFowlSkillSet && (
                      <Typography>
                      {typeof errors.gameFowlSkillSet?.message === 'string' 
                        ? errors.gameFowlSkillSet.message 
                        : errors.gameFowlSkillSet?.message?.toString() || 'No error message'}
                    </Typography>
                    
                    )}
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

export default EditGameFowlSkills;
