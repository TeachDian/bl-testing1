"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideBookOpen,
  LucideBookText,
  LucideNewspaper,
  LucidePenLine,
  LucideSquareGantt,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useAddNews from "../../hooks/useAddNews";
import { useForm } from "react-hook-form";
import { T_News } from "@repo/contract";
import { useQueryClient } from "@tanstack/react-query";
import useGetNewsById from "@/common/hooks/Web-Contents/useGetNewsById";
import toast from "react-hot-toast";

interface ItemListProps {
  initialItems?: Date[];
}

const index = ({ initialItems = [] }: ItemListProps) => {
  const params = useParams<{ contentId: string; eventId: string }>();
  const contentId = String(params.contentId);
  const eventId = params.eventId;

  const { mutateAsync: addNews } = useAddNews();
  const { register, handleSubmit, watch } = useForm<T_News>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetNewsById(eventId);

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const newsDescription = watch("newsDescription", "");
  const maxDescriptionLength = 500;

  const onSubmit = async (formData: T_News) => {
    try {
      const modifiedFormData = {
        ...formData,
        newsTitle: capitalizeFirstLetter(formData.newsTitle),
        newsHost: capitalizeFirstLetter(formData.newsHost),
        newsDescription: capitalizeFirstLetter(formData.newsDescription),
      };

      const response = await addNews(modifiedFormData);
      console.log(response);
      if (!response.error) {
        const newNewsIs = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["news", newNewsIs],
        });
        setTimeout(() => {
          router.push(
            `/admin/web-contents/${contentId}/news/${newNewsIs}/photos`
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
    <>
      <WidthWrapper width="full">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex gap-2 items-center">
            <LucideNewspaper />
            <Typography variant="h1" fontWeight="semiBold">
              Add News
            </Typography>
          </div>

          <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
            <div className="flex gap-2 items-center">
              <LucideBookOpen />
              <Typography variant="h3" fontWeight="semiBold">
                Set up news
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
                        Title of news
                      </Typography>
                      <Input
                        placeholder="Enter title of news"
                        required
                        {...register("newsTitle", {
                          required: "You need to fill up this field",
                        })}
                        className="flex-1"
                      />
                    </div>
                    <div className="sm:flex items-center mb-4 gap-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        Posted by
                      </Typography>
                      <Input
                        placeholder="Enter author or source of news"
                        className="flex-1"
                        required
                        {...register("newsHost", {
                          required: true,
                        })}
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
                        {...register("newsDate", {
                          required: true,
                        })}
                      />
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        Caption
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Textarea
                          placeholder="Enter caption for activity"
                          style={{ width: "100%", height: "250px" }}
                          className="w-full text-justify"
                          maxLength={maxDescriptionLength}
                          {...register("newsDescription", {
                            required: true,
                            maxLength: maxDescriptionLength,
                          })}
                        />
                        <div className="text-right text-sm text-gray-500">
                          {newsDescription.length}/{maxDescriptionLength}
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
    </>
  );
};

export default index;
