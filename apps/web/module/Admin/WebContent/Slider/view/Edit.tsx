"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideAlertCircle,
  LucideBookOpen,
  LucideBookText,
  LucideImagePlus,
  LucidePenLine,
  LucideSquareGantt,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { T_Sliders } from "@repo/contract";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useGetSliderById from "@/common/hooks/Web-Contents/useGetSliderById";
import useUpdateSlider from "@/module/Admin/hooks/useUpdateSlider";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect } from "react";
import Link from "next/link";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

interface ItemListProps {
  initialItems?: Date[];
}

const index = ({ initialItems = [] }: ItemListProps) => {
  const params = useParams<{ contentId: string; sliderId: string }>();
  const contentId = String(params.contentId);
  const sliderId = params.sliderId;

  const { mutateAsync: updateSlider } = useUpdateSlider(sliderId);
  const { setValue, register, handleSubmit, watch } = useForm<T_Sliders>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isPending } = useGetSliderById(sliderId);

  const onSubmit = async (formData: T_Sliders) => {
    try {
      const modifiedFormData = {
        ...formData,
        sliderDescription: capitalizeFirstLetter(formData.sliderDescription || ""),
      };
      const response = await updateSlider(modifiedFormData);
      console.log(response);
      if (!response.error) {
        const newSliderId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["sliders", newSliderId],
        });
        setTimeout(() => {
          router.push(`/admin/web-contents/${contentId}/sliders/view`);
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

      setValue("sliderDescription", data.item.sliderDescription || "");
    }
  }, [data, isPending, setValue]);

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="full">
          <div className="flex flex-col w-full space-y-4">
            <div className="flex gap-2 items-center">
              <LucideImagePlus />
              <Typography variant="h1" fontWeight="semiBold">
                Edit Sliders
              </Typography>
            </div>

            <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
              <div className="flex gap-2 items-center">
                <LucideBookOpen />
                <Typography variant="h3" fontWeight="semiBold">
                  Set up slider photos
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
                      <div className="sm:flex gap-2 mb-4">
                        <div className="flex gap-2 mt-2">
                          <LucidePenLine size={20} />
                          <Typography fontWeight="semiBold" className="w-48">
                            Edit slider title
                          </Typography>
                        </div>

                        <div>
                          <Input
                            placeholder="Enter title of slider"
                            required
                            {...register("sliderDescription", {
                              required: "You need to fill up this field",
                            })}
                            className="flex-1"
                          />
                          <div className="sm:flex gap-2 mt-4 mb-8">
                            <LucideAlertCircle size={20} />
                            <Typography className="text-sm text-gray-600 italic mb-4">
                              Here you can remove unwanted photos to your slider{" "}
                              <br />
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        className="mt-12 w-32"
                      >
                        Update
                      </Button>
                      <Link
                        href={`/admin/web-contents/${contentId}/sliders/view`}
                      >
                        <Button
                          variant="destructive"
                          size="lg"
                          className="mt-12 w-32"
                        >
                          Back
                        </Button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default index;
