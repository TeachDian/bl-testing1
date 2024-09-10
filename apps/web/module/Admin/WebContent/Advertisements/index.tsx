"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
//
import { Typography } from "@/common/components/ui/Typography";
import { LucideBookOpen, LucidePenLine, LucideTag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAddBillboard from "../../hooks/useAddBillboard";
import { useForm } from "react-hook-form";
import { T_Billboards } from "@repo/contract";
import { useQueryClient } from "@tanstack/react-query";
import useGetAdvertisementById from "@/common/hooks/Web-Contents/useGetAdvertisementById";
import toast from "react-hot-toast";

interface ItemListProps {
  initialItems?: Date[];
}

const index = ({ initialItems = [] }: ItemListProps) => {
  const params = useParams<{ contentId: string; advertisementsId: string }>();
  const contentId = String(params.contentId);
  const advertisementsId = params.advertisementsId;
  const { mutateAsync: addBillboard } = useAddBillboard();
  const { register, handleSubmit } = useForm<T_Billboards>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetAdvertisementById(advertisementsId);


  const onSubmit = async (formData: T_Billboards) => {
    try {
      const response = await addBillboard(formData);
      console.log(response);
      if (!response.error) {
        const newAdvertisementsId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["advertisement", newAdvertisementsId],
        });
        setTimeout(() => {
          router.push(
            `/admin/web-contents/${contentId}/advertisements/view`
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
          <LucideTag />
          <Typography variant="h1" fontWeight="semiBold">
            Add Advertisements
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Set up billboard advertisements
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
                      Start date
                    </Typography>
                    <Input
                      type="date"
                      className="sm:w-80 w-full flex flex-col"
                      required
                      {...register("startDate", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      End date
                    </Typography>
                    <Input
                      type="date"
                      className="sm:w-80 w-full flex flex-col"
                      required
                      {...register("endDate", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <Button
                  className="mt-4 self-start w-32"
                  variant="default"
                  size="lg"
                  type="submit"
                >
                  Save | Submit
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
