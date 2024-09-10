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
import { useForm } from "react-hook-form";
import { T_News } from "@repo/contract";
import { useQueryClient } from "@tanstack/react-query";
import useGetNewsById from "@/common/hooks/Web-Contents/useGetNewsById";
import toast from "react-hot-toast";
import useUpdateNews from "@/module/Admin/hooks/useUpdateNews";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Spinner } from "@/common/components/ui/Spinner";
import Link from "next/link";

interface ItemListProps {
  initialItems?: Date[];
}

const index = ({ initialItems = [] }: ItemListProps) => {
  const [items, setItems] = useState<Date[]>(initialItems);
  const params = useParams<{ contentId: string; newsId: string }>();
  const contentId = String(params.contentId);
  const newsId = params.newsId;

  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: updateNews } = useUpdateNews(newsId);
  const { setValue, register, handleSubmit, watch } = useForm<T_News>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isPending } = useGetNewsById(newsId);

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
      setIsLoading(true);
      const response = await updateNews(modifiedFormData);
      console.log("Response:", response);
      toast.success("News updated successfully!");
      router.push(`/admin/web-contents/${contentId}/news/view`);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && data?.item) {
      const item = data.item;
      const parsedDate = data.item.newsDate
        ? parseISO(data.item.newsDate)
        : new Date();
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      setValue("newsDate", formattedDate);
      setValue("newsTitle", item.newsTitle || "");
      setValue("newsHost", item.newsHost || "");
      setValue("newsDescription", item.newsDescription || "");
    }
  }, [data, isPending, setValue]);

  return (
    <>
      <WidthWrapper width="full">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex gap-2 items-center">
            <LucideNewspaper />
            <Typography variant="h1" fontWeight="semiBold">
              Edit News
            </Typography>
          </div>

          <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
            <div className="flex gap-2 items-center">
              <LucideBookOpen />
              <Typography variant="h3" fontWeight="semiBold">
                Update news
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
                    <div className="sm:flex items gap-2">
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
                    <Link href={`/admin/web-contents/${contentId}/news/view`}>
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
    </>
  );
};

export default index;
