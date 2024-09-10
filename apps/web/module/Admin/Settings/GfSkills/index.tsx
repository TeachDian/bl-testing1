"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookText, LucidePenLine, LucideSquareGantt } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { T_Game_Fowl_Skills } from "@repo/contract";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useAddGameFowlSkills from "../hooks/useAddGameFowlSkills";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { DropdownItem } from "@/module/LandingPage/components/DropDown";

// Utility function to clean up the input
const cleanString = (text: string) => {
  return text.trim(); // Remove leading and trailing spaces
};

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const AddGameFowlSkills = () => {
  const { mutateAsync: addGameFowlSkills } = useAddGameFowlSkills();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_Game_Fowl_Skills>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTypeOrBreed, setSelectedTypeOrBreed] =
    useState<DropdownItem | null>(null);
  const [selectedSkillsCategory, setSelectedSkillsCategory] =
    useState<DropdownItem | null>(null);

  const { data, isPending } = useGetBreederSettings();

  useEffect(() => {
    console.log("Fetched breeder settings data:", data);
  }, [data]);

  const typeData: DropdownItem[] = (data?.items[0]?.gameFowlType || []).map(
    (item: any) => ({
      _id: item._id,
      item: item.gameFowlType,
      value: item._id,
    })
  );

  const skillsCategoryData: DropdownItem[] = (
    data?.items[0]?.gameFowlSkillsCategory || []
  ).map((item: any) => ({
    _id: item._id,
    item: item.skillsCategory,
    value: item._id,
  }));

  useEffect(() => {
    console.log("Fetched data:", data);
    console.log("Type Data:", typeData);
    console.log("Skills Category Data:", skillsCategoryData);
  }, [data, typeData, skillsCategoryData]);

  const onSubmit = async (formData: T_Game_Fowl_Skills) => {
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

      // Clean the skill set input to ensure no additional quotation marks are added
      const cleanedSkillSet = cleanString(modifiedFormData.gameFowlSkillSet);

      // Verify cleaned data
      console.log("Cleaned data:", cleanedSkillSet);

      const dataToSubmit = {
        ...modifiedFormData,
        gameFowlType,
        gameFowlSkillsCategory,
        gameFowlSkillSet: cleanedSkillSet,
      };

      console.log("Submitting data:", dataToSubmit); // Ensure data is formatted correctly

      const response = await addGameFowlSkills(dataToSubmit);

      // Verify response and data in the database
      console.log("Response from API:", response);

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

  useEffect(() => {
    console.log("Fetched typeData:", typeData);
    console.log("Selected item:", selectedTypeOrBreed);
  }, [typeData, selectedTypeOrBreed]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideSquareGantt />
          <Typography variant="h1" fontWeight="semiBold">
            Game Fowl Skills
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookText />
            <Typography variant="h3" fontWeight="semiBold">
              Add Game Fowl Skills
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
                      Game Fowl Type
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
                      Game Fowl Skills Category
                    </Typography>
                    {skillsCategoryData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={skillsCategoryData}
                        selectedItem={selectedSkillsCategory}
                        onSelectItem={(item) => setSelectedSkillsCategory(item)}
                        placeholder="Select skills category"
                      />
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game Fowl Skill Set
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
                      <Typography className="text-red-600">
                        {errors.gameFowlSkillSet.message}
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
                  {isLoading ? <Spinner size="md" /> : "Save | Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default AddGameFowlSkills;
