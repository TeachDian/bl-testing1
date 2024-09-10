"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideBookOpen,
  LucideBookText,
  LucideClapperboard,
  LucidePenLine,
  LucideSquareGantt,
  LucideVideo,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useAddVideo, { addVideo } from "../../hooks/useAddVideo";
import { useForm } from "react-hook-form";
import { T_Videos } from "@repo/contract";
import { useQueryClient } from "@tanstack/react-query";
import useGetVideoById from "@/common/hooks/Web-Contents/useGetVideoById";
import { useState } from "react";
import toast from "react-hot-toast";

const index = () => {
  const params = useParams<{ contentId: string; videoId: string }>();
  const videoId = params.videoId;
  const contentId = params.contentId;
  const { mutateAsync: addVideo } = useAddVideo();
  const { register, handleSubmit, watch } = useForm<T_Videos>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetVideoById(videoId);
  const [isLoading, setIsLoading] = useState(false);

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const onSubmit = async (formData: T_Videos) => {
    try {
      const modifiedFormData = {
        ...formData,
        videoTitle: capitalizeFirstLetter(formData.videoTitle),
      };
      const response = await addVideo(modifiedFormData);
      console.log(response);
      if (!response.error) {
        const newVideoId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["videos", newVideoId],
        });
        setTimeout(() => {
          router.push(`/admin/web-contents/${contentId}/videos/view`);
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
          <LucideClapperboard />
          <Typography variant="h1" fontWeight="semiBold">
            Add Videos
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Set up videos
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
                    <div>
                      <div className="flex mb-4 gap-2">
                        <div className="flex gap-2 mt-2">
                          <LucidePenLine size={20} />
                          <Typography fontWeight="semiBold" className="w-48">
                            Title of video
                          </Typography>
                        </div>

                        <Input
                          placeholder="Enter title of video"
                          required
                          {...register("videoTitle", {
                            required: "You need to fill up this field",
                          })}
                          className="flex-1"
                        />
                      </div>

                      <div className="sm:flex items-center mb-4 gap-2">
                        <LucidePenLine size={20} />
                        <Typography fontWeight="semiBold" className="w-48">
                          Pick date
                        </Typography>
                        <Input
                          type="date"
                          className="sm:w-80 w-full flex flex-col"
                          required
                          {...register("videoDate", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="sm:flex items gap-2 mt-2">
                        <LucidePenLine size={20} />
                        <Typography fontWeight="semiBold" className="w-48">
                          Embedded Code
                        </Typography>
                        <div className="sm:w-80 w-full flex flex-col">
                          <Textarea
                            placeholder="Paste your embedded code here"
                            style={{ width: "100%", height: "250px" }}
                            className="sm:w-80 w-full text-justify"
                            {...register("videoLink", { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="default" size="lg" className="mt-12 w-32">
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
