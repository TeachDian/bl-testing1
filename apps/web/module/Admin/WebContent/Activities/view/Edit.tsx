"use client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import useUpdateActivity from "@/public/module/Admin/hooks/useUpdateActivity";
import { T_Activities } from "@repo/contract";
import toast from "react-hot-toast";
import { Spinner } from "@/common/components/ui/Spinner";
import { useEffect, useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { LucideBookText, LucideSquareGantt } from "lucide-react";
import { Typography } from "@/common/components/ui/Typography";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Button } from "@/common/components/shadcn/ui/button";
import useGetActivityById from "@/common/hooks/Web-Contents/useGetActivityById";
import { format, parseISO } from "date-fns";

const AddActivity = () => {
  const params = useParams<{ contentId: string; activityId: string }>();
  const contentId = params.contentId;
  const activityId = params.activityId;

  const { mutateAsync: updateActivity } = useUpdateActivity(activityId);
  const { data, isPending } = useGetActivityById(activityId);
  const { register, handleSubmit, setValue } = useForm<T_Activities>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: T_Activities) => {
    try {
      setIsLoading(true);
      const response = await updateActivity(formData);
      console.log("Response:", response);
      toast.success("Activity updated successfully!");
      router.push(`/admin/web-contents/${contentId}/activities/add`);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update activity");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && data?.item) {
      const item = data.item;

      const parsedDate = data.item.activityDate ? parseISO(data.item.activityDate) : new Date();
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      setValue("activityTitle", data.item.activityTitle || "");
      setValue("activityHost", data.item.activityHost || "");
      setValue("activityDate", formattedDate);
      setValue("activityDescription", data.item.activityDescription || "");
    }
  }, [data, isPending, setValue]);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideSquareGantt />
          <Typography variant="h1" fontWeight="semiBold">
            Edit Activities
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookText />
            <Typography variant="h3" fontWeight="semiBold">
              Update activity details
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
                  <div className="sm:flex items-center mb-4">
                    <Typography fontWeight="semiBold" className="w-48">
                      Title of activity
                    </Typography>
                    <Input
                      placeholder="Enter activity title"
                      required
                      {...register("activityTitle", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                  </div>
                  <div className="sm:flex items-center mb-4">
                    <Typography fontWeight="semiBold" className="w-48">
                      Posted by
                    </Typography>
                    <Input
                      placeholder="Enter author or source"
                      className="flex-1"
                      required
                      {...register("activityHost", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="sm:flex items-center mb-4">
                    <Typography fontWeight="semiBold" className="w-48">
                      Pick date
                    </Typography>
                    <Input
                      type="date"
                      className="sm:w-80 w-full flex flex-col"
                      required
                      {...register("activityDate", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="sm:flex items-center mb-4">
                    <Typography fontWeight="semiBold" className="w-48">
                      Caption
                    </Typography>
                    <Textarea
                      placeholder="Enter caption for activity"
                      className="sm:w-80 w-full"
                      {...register("activityDescription", {
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

export default AddActivity;
