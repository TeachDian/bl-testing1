"use client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import useUpdateBillboard from "@/module/Admin/hooks/useUpdateBillboard";
import { T_Billboards } from "@repo/contract";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import {
  LucideBookOpen,
  LucideClipboardCheck,
  LucidePenLine,
} from "lucide-react";
import { Typography } from "@/common/components/ui/Typography";
import { Input } from "@/common/components/shadcn/ui/input";
import { Button } from "@/common/components/shadcn/ui/button";
import useGetAdvertisementById from "@/common/hooks/Web-Contents/useGetAdvertisementById";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const EditBillboard = () => {
  const params = useParams<{ contentId: string; advertisementsId: string }>();
  const contentId = params.contentId;
  const advertisementsId = params.advertisementsId;

  const { mutateAsync: updateBillboard } = useUpdateBillboard(advertisementsId);
  const { data, isPending } = useGetAdvertisementById(advertisementsId);
  const { register, handleSubmit, setValue } = useForm<T_Billboards>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: T_Billboards) => {
    try {
      setIsLoading(true);
      const response = await updateBillboard(formData);
      console.log("Response:", response);
      toast.success("Billboard updated successfully!");
      router.push(`/admin/web-contents/${contentId}/advertisements/view`);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update billboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && data?.item) {
      const item = data.item;
  
      const parsedStartDate = item.startDate ? parseISO(item.startDate) : new Date();
      const parsedEndDate = item.endDate ? parseISO(item.endDate) : new Date();
  
      const formattedStartDate = format(parsedStartDate, "yyyy-MM-dd");
      const formattedEndDate = format(parsedEndDate, "yyyy-MM-dd");
  
      setValue("startDate", formattedStartDate);
      setValue("endDate", formattedEndDate);
    }
  }, [data, isPending, setValue]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideClipboardCheck />
          <Typography variant="h1" fontWeight="semiBold">
            Edit Billboard
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Update Billboard Advertisement
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
                      Start Date
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
                      End Date
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
                <div className="flex gap-4">
                  <Button
                    className="mt-4 self-start w-32"
                    variant="default"
                    size="lg"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner size="md" /> : "Update"}
                  </Button>
                  <Link
                    href={`/admin/web-contents/${contentId}/advertisements/view`}
                  >
                    <Button
                      className="mt-4 self-start w-32"
                      variant="destructive"
                      size="lg"
                      disabled={isLoading}
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
  );
};

export default EditBillboard;
