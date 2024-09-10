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
import { T_Game_Fowl_Type } from "@repo/contract";
import Dropdown, { DropdownItem } from "@/module/LandingPage/components/DropDown";
import { LucidePenLine, LucideDna, LucideBookOpen } from "lucide-react";
import useUpdateGameFowlType from "../hooks/useUpdateGameFowlType";
import useGetGameFowlTypeById from "../hooks/useGetGameFowlTypeById";
import useGetBreederSettings from "@/common/hooks/Breeder-Settings/useGetBreederSettings";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const EditGameFowlType = () => {
  const params = useParams<{ typeId: string }>();
  const typeId = params.typeId;
  const { mutateAsync: updateGameFowlType } = useUpdateGameFowlType(typeId);
  const { getValues, setValue, register, handleSubmit, formState: { errors } } = useForm<T_Game_Fowl_Type>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypeOrBreed, setSelectedTypeOrBreed] = useState<DropdownItem | null>(null);

  const { data: breederData, isPending: breederPending } = useGetBreederSettings();
  const { data: typeData, isPending: typePending } = useGetGameFowlTypeById(typeId);

  const fowlClassData: DropdownItem[] = (breederData?.items[0]?.gameFowlClass || []).map((item: any) => ({
    _id: item._id,
    item: item.classTitle, 
    value: item._id,
  }));
  

  useEffect(() => {
    if (!typePending && typeData?.item) {
      const item = typeData.item;

      if (!getValues("gameFowlType")) {
        setValue("gameFowlType", item.gameFowlType);
      }

      const selectedClass = fowlClassData.find((cls) => cls._id === item.gameFowlClass._id) || null;
      if (!selectedTypeOrBreed) {
        setSelectedTypeOrBreed(selectedClass);
      }
    }
  }, [typeData, typePending, setValue, fowlClassData, selectedTypeOrBreed, getValues]);

  const onSubmit = async (formData: T_Game_Fowl_Type) => {
    try {
      const modifiedFormData = {
        ...formData,
        gameFowlType: capitalizeFirstLetter(formData.gameFowlType),
      };
      setIsLoading(true);
      const gameFowlClass = selectedTypeOrBreed?._id ?? "";

      if (!gameFowlClass) {
        throw new Error("Please select a game fowl class");
      }

      const dataToSubmit = {
        ...modifiedFormData,
        gameFowlClass,
      };

      const response = await updateGameFowlType(dataToSubmit);

      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-type/view`);
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
            Edit Game Fowl Type
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update game fowl type
            </Typography>
          </div>
          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game Fowl Class
                    </Typography>
                    {fowlClassData.length === 0 ? (
                      <div>No options available</div>
                    ) : (
                      <Dropdown
                        items={fowlClassData}
                        selectedItem={selectedTypeOrBreed}
                        onSelectItem={(item) => setSelectedTypeOrBreed(item)}
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
                      {...register("gameFowlType", { required: "You need to fill up this field" })}
                      className="flex-1"
                    />
                    {errors.gameFowlType && (
                      <Typography className="text-red-600">
                        {errors.gameFowlType.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <Button className="mt-4 self-start w-32" variant="default" size="lg" type="submit" disabled={isLoading}>
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

export default EditGameFowlType;
