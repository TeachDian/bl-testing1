"use client";
import { useState, useEffect } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucidePenLine, LucideFileType, LucideBookOpen } from "lucide-react";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import useAddGameFowlType from "../hooks/useAddGameFowlType";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import { DropdownItem } from "@/module/LandingPage/components/DropDown";
import { T_Game_Fowl_Type } from "@repo/contract";

// Utility function to clean up the input
const cleanString = (text: string) => {
  return text.trim(); // Remove leading and trailing spaces
};

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
const AddGameFowlType = () => {
  const { mutateAsync: addGameFowlType } = useAddGameFowlType();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_Game_Fowl_Type>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedClass, setSelectedClass] = useState<DropdownItem | null>(null);

  const { data, isPending } = useGetBreederSettings(); // Fetch game fowl classes for the dropdown

  useEffect(() => {
    console.log("Fetched game fowl classes:", data);
  }, [data]);

 const classData: DropdownItem[] = (data?.items[0]?.gameFowlClass || []).map(
    (item: any) => ({
    _id: item._id,
    item: item.classTitle,
    value: item._id,
  }));

  const onSubmit = async (formData: T_Game_Fowl_Type) => {
    try {
      const modifiedFormData = {
        ...formData,
        gameFowlType: capitalizeFirstLetter(formData.gameFowlType),
      };
      setIsLoading(true);
      const gameFowlClass = selectedClass?._id ?? "";

      if (!gameFowlClass) {
        throw new Error("Please select a game fowl class");
      }

      const cleanedGameFowlType = cleanString(modifiedFormData.gameFowlType);

      const dataToSubmit = {
        ...modifiedFormData,
        gameFowlClass,
        gameFowlType: cleanedGameFowlType,
      };

      const response = await addGameFowlType(dataToSubmit);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/admin/settings/gf-type/view");
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
          <LucideFileType />
          <Typography variant="h1" fontWeight="semiBold">
            Game Fowl Type
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
            Add Game Fowl Type
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
                      Game Fowl Class
                    </Typography>
                    {classData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={classData}
                        selectedItem={selectedClass}
                        onSelectItem={(item) => setSelectedClass(item)}
                        placeholder="Select game fowl class"
                      />
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game Fowl Type
                    </Typography>
                    <Input
                      placeholder="Enter game fowl type"
                      required
                      {...register("gameFowlType", {
                        required: "You need to fill up this field",
                      })}
                      className="sm:w-80 w-full"
                    />
                    {errors.gameFowlType && (
                      <Typography className="text-red-600">
                        {errors.gameFowlType.message}
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

export default AddGameFowlType;
