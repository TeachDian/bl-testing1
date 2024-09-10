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
import { T_Game_Fowl_Traits } from "@repo/contract";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";
import useUpdateGameFowlTraits from "../hooks/useUpdateGameFowlTraits";
import useGetGameFowlTraitsById from "../hooks/useGetGameFowlTraits";
import Dropdown, {
  DropdownItem,
} from "@/module/LandingPage/components/DropDown";
import { LucidePenLine, LucideDna, LucideBookOpen } from "lucide-react";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const EditGameFowlTraits = () => {
  const params = useParams<{ traitsId: string }>();
  const traitsId = params.traitsId;
  const { mutateAsync: updateGameFowlTraits } =
    useUpdateGameFowlTraits(traitsId);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_Game_Fowl_Traits>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTypeOrBreed, setSelectedTypeOrBreed] =
    useState<DropdownItem | null>(null);
  const [selectedTraitsCategory, setSelectedTraitsCategory] =
    useState<DropdownItem | null>(null);

  const { data: breederData, isPending: breederPending } =
    useGetBreederSettings();
  const { data: traitsData, isPending: traitsPending } =
    useGetGameFowlTraitsById(traitsId);

  const typeData: DropdownItem[] = (
    breederData?.items[0]?.gameFowlType || []
  ).map((item: any) => ({
    _id: item._id,
    item: item.gameFowlType,
    value: item._id,
  }));

  const traitsCategoryData: DropdownItem[] = (
    breederData?.items[0]?.gameFowlTraitsCategory || []
  ).map((item: any) => ({
    _id: item._id,
    item: item.traitsCategory,
    value: item._id,
  }));

  useEffect(() => {
    if (!traitsPending && traitsData?.item) {
      const item = traitsData.item;
  
      const cleanedTraitsSet = item.gameFowlTraitsSet
        ? item.gameFowlTraitsSet.replace(/[""]/g, "")
        : "";
  
      // Check if the form is already populated to prevent overwriting user edits
      if (!getValues("gameFowlTraitsSet")) {
        setValue("gameFowlTraitsSet", cleanedTraitsSet);
      }
  
      // Set the selected values for dropdowns only if they aren't already selected
      const selectedType =
        typeData.find((type) => type._id === item.gameFowlType._id) || null;
      const selectedCategory =
        traitsCategoryData.find(
          (category) => category._id === item.gameFowlTraitsCategory._id
        ) || null;
  
      if (!selectedTypeOrBreed) {
        setSelectedTypeOrBreed(selectedType);
      }
  
      if (!selectedTraitsCategory) {
        setSelectedTraitsCategory(selectedCategory);
      }
    }
  }, [
    traitsData,
    traitsPending,
    setValue,
    typeData,
    traitsCategoryData,
    selectedTypeOrBreed,
    selectedTraitsCategory,
    getValues,
  ]);
  

  const onSubmit = async (formData: T_Game_Fowl_Traits) => {
    try {
      const modifiedFormData = {
        ...formData,
        gameFowlTraitsSet: capitalizeFirstLetter(formData.gameFowlTraitsSet),
      };
      setIsLoading(true);
      const gameFowlType = selectedTypeOrBreed?._id ?? "";
      const gameFowlTraitsCategory = selectedTraitsCategory?._id ?? "";

      if (!gameFowlType || !gameFowlTraitsCategory) {
        throw new Error(
          "Please select both game fowl type and traits category"
        );
      }

      const dataToSubmit = {
        ...modifiedFormData,
        gameFowlType,
        gameFowlTraitsCategory,
      };

      const response = await updateGameFowlTraits(dataToSubmit);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-traits/view`);
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
            Edit Game Fowl Traits
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update game fowl traits
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
                      Game fowl traits category
                    </Typography>
                    {traitsCategoryData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={traitsCategoryData}
                        selectedItem={selectedTraitsCategory}
                        onSelectItem={(item) => setSelectedTraitsCategory(item)}
                        placeholder="Select traits category"
                      />
                    )}
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game fowl traits set
                    </Typography>
                    <Input
                      placeholder="Enter game fowl trait set"
                      required
                      {...register("gameFowlTraitsSet", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                    {errors.gameFowlTraitsSet && (
                      <Typography className="text-red-600">
                        {errors.gameFowlTraitsSet.message}
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

export default EditGameFowlTraits;
