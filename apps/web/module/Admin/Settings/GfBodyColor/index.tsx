"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucideBookText, LucidePalette, LucidePenLine, LucideSquareGantt } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { T_Game_Fowl_Body_Color } from "@repo/contract";
import useAddGameFowlBodyColor from "../hooks/useAddGameFowlBodyColor";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const AddFederation = () => {

  const { mutateAsync: addBodyColor } = useAddGameFowlBodyColor();
  const { register, handleSubmit } = useForm<T_Game_Fowl_Body_Color>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: T_Game_Fowl_Body_Color) => {
    try {
      const modifiedFormData = {
        ...formData,
        colorTitle: capitalizeFirstLetter(formData.colorTitle),
        colorDetails: capitalizeFirstLetter(formData.colorDetails),
      };
      const response = await addBodyColor(modifiedFormData);
      console.log(response);
      if (!response.error) {
        toast.success(response.message);
        setTimeout(() => {
          router.push(
            `/admin/settings/gf-body-color/view`
          );
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
          <LucidePalette />
          <Typography variant="h1" fontWeight="semiBold">
          Add Game Fowl Feather Color
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
            Set up game fowl feather color
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
                    Feather color title
                    </Typography>
                    <Input
                      placeholder="Enter game fowl feather color"
                      required
                      {...register("colorTitle", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                    Feather color details
                    </Typography>
                    <Input
                      placeholder="Enter game fowl feather color details"
                      required
                      {...register("colorDetails", {
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

export default AddFederation;
