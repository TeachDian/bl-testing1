"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import { LucidePenLine } from "lucide-react";
import useAddActivity from "../../hooks/useAddActivity";
import { useForm } from "react-hook-form";
import { T_Activities } from "@repo/contract";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useGetActivityById from "@/common/hooks/Web-Contents/useGetActivityById";

const AddActivity = () => {
  const params = useParams<{ contentId: string; activityId: string }>();
  const contentId = params.contentId;
  const activityId = params.activityId;
  
  const { mutateAsync: addActivity } = useAddActivity();
  const { register, handleSubmit } = useForm<T_Activities>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetActivityById(activityId);

  const onSubmit = async (formData: T_Activities) => {
    try {
      const response = await addActivity(formData);
      console.log(response);
      if (!response.error) {
        const newActivityId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["activities", newActivityId],
        });
        setTimeout(() => {
          router.push(
            `/admin/web-contents/${contentId}/activities/${newActivityId}/photos`
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
      <Typography variant="h1" fontWeight="semiBold">
        Add Activities
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up announcement of activities</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="activityTitle" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Title of activity
          </Typography>
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter title of activity"
          className="sm:w-80 w-full"
          required
          {...register("activityTitle", {
            required: "You need to fill up this field",
          })}
        />

        <div className="mt-4 flex items-center space-x-2 mb-2">
          <LucidePenLine size={20} />
          <label htmlFor="activityHost" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Posted by
            </Typography>
          </label>
        </div>
        <Input
          placeholder="Enter author or source"
          className="sm:w-80 w-full"
          required
          {...register("activityHost", {
            required: true,
          })}
        />
        <div className="mt-4 flex items-center space-x-2 mb-2">
          <LucidePenLine size={20} />
          <label htmlFor="activityDate" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Pick date
            </Typography>
          </label>
        </div>
        <Input
          type="date"
          className="sm:w-80 w-full flex flex-col"
          required
          {...register("activityDate", {
            required: true,
          })}
        />
        <div className="mt-4 flex items-center space-x-2 mb-2">
          <LucidePenLine size={20} />
          <label htmlFor="activityDescription" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Caption
            </Typography>
          </label>
        </div>
        <Textarea
          placeholder="Enter caption for activity"
          className="sm:w-80 w-full"
          {...register("activityDescription", {
            required: true,
          })}
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-12 w-32"
        >
          Save | Submit
        </Button>
      </form>
    </WidthWrapper>
  );
};

export default AddActivity;
