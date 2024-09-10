"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { T_Game_Fowl_Status, T_Update_Game_Fowl_Status } from "@repo/contract";
import { LucidePenLine, LucideSquareGantt, LucideBookText, LucideBatteryCharging, LucideHourglass, LucideBookOpen } from "lucide-react";
import { useState } from "react";
import useAddGameFowlStatus, { addGameFowlStatus } from "../hooks/useAddGameFowlStatus";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/common/components/ui/Spinner";
import { useForm } from "react-hook-form";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

interface DropdownItem {
  id: number;
  item: string;
}

const GfStatus: DropdownItem[] = [
  { id: 1, item: "Female" },
  { id: 2, item: "Male" },
];

const AddGameFowlStatus = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const { mutateAsync: addGameFowlStatus } = useAddGameFowlStatus();
  const { register, handleSubmit, watch } = useForm<T_Update_Game_Fowl_Status>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const description = watch("description", "");
  const maxDescriptionLength = 500;

  const onSubmit = async (formData: T_Game_Fowl_Status) => {
    try {
      const modifiedFormData = {
        ...formData,
      };
      const response = await addGameFowlStatus(modifiedFormData);
      console.log(response);
      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/admin/settings/gf-status/view`);
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(String(err));
    }
  };

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideHourglass />
          <Typography variant="h1" fontWeight="semiBold">
            Add Game Fowl Status
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Set up game fowl status
            </Typography>
          </div>
          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
              <form
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game Fowl Type
                    </Typography>
                    <Dropdown
                      items={GfStatus}
                      selectedItem={selectedItem}
                      onSelectItem={setSelectedItem}
                      placeholder="Select game fowl gender"
                      className="flex-1"
                    />
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Game Fowl Status
                    </Typography>
                    <Input
                      placeholder="Enter game fowl status"
                      required
                      {...register("gameFowlStatus", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Age Range
                    </Typography>
                    <Input
                      placeholder="Enter game fowl age"
                      required
                      className="flex-1"
                    />
                  </div>
                  <div className="sm:flex items gap-2 mt-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Description
                    </Typography>
                    <div className="sm:w-80 w-full flex flex-col">
                      <Textarea
                        placeholder="Enter caption for activity"
                        style={{ width: "100%", height: "250px" }}
                        className="w-full text-justify"
                        maxLength={maxDescriptionLength}
                        {...register("description", {
                          required: true,
                          maxLength: maxDescriptionLength,
                        })}
                      />
                      <div className="text-right text-sm text-gray-500">
                        {description.length}/{maxDescriptionLength}
                      </div>
                    </div>
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

export default AddGameFowlStatus;
