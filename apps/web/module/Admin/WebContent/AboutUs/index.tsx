"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import { T_About_Us } from "@repo/contract";
import {
  LucideBookOpen,
  LucideClipboardCheck,
  LucidePenLine,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddAboutUs from "../../hooks/useAddAboutUs";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Dropdown, {
  DropdownItem,
} from "@/module/LandingPage/components/DropDown";
import Link from "next/link";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { useRouter } from "next/navigation";

const dummyVersions: DropdownItem[] = [
  { id: 1, item: "Version 1.0" },
  { id: 2, item: "Version 2.0" },
  { id: 3, item: "Version 3.0" },
  { id: 4, item: "Version 4.0" },
  { id: 5, item: "Version 5.0" },
];

const Index = () => {
  const { register, handleSubmit, watch } = useForm<T_About_Us>();
  const { mutateAsync: addAboutUs } = useAddAboutUs();
  const maxDescriptionLength = 500;
  const [isLoading, setIsLoading] = useState(false);
  const visionDescription = watch("vision", "");
  const missionDescription = watch("mission", "");
  const systemInformationDescription = watch("systemInformation", "");
  const systemDescription = watch("systemDescription", "");
  const queryClient = useQueryClient();
  const [selectedVersion, setSelectedVersion] = useState<DropdownItem | null>(
    null
  );
  const router = useRouter();
  const { data, isPending } = useGetWebContents();
  const webContents = data?.items[0];

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const onSubmit = async (formData: T_About_Us) => {
   
      try {
        setIsLoading(true);
        const modifiedFormData = {
          ...formData,
          systemName: capitalizeFirstLetter(formData.systemName),
          systemInformation: capitalizeFirstLetter(formData.systemInformation),
          vision: capitalizeFirstLetter(formData.vision),
          mission: capitalizeFirstLetter(formData.mission),
          systemDescription: capitalizeFirstLetter(formData.systemDescription),
          version: selectedVersion ? selectedVersion.item : formData.version,
        };

        const response = await addAboutUs(modifiedFormData);
        console.log(response);
        if (!response.error) {
          const newActivityId = response.item._id;
          toast.success(response.message);

          queryClient.invalidateQueries({
            queryKey: ["about-us", newActivityId],
          });
        } else {
          toast.error(response.message || "An error occurred");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error(String(err));
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    if (webContents?.aboutUs && webContents.aboutUs.length > 0) {
      router.push(`/admin/web-contents/666839086f2250f4d1cefb84/about-us/edit`);
    }
  }, [webContents, router]);
  
  return (
    <>
      <WidthWrapper width="full">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex gap-2 items-center">
            <LucideClipboardCheck />
            <Typography variant="h1" fontWeight="semiBold">
              Breeder's Link
            </Typography>
          </div>
          <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
            <div className="flex gap-2 items-center">
              <LucideBookOpen />
              <Typography variant="h3" fontWeight="semiBold">
                Set up information "About us" page for landing page
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
                        System Name
                      </Typography>
                      <Input
                        placeholder="Enter system name"
                        required
                        {...register("systemName", {
                          required: "You need to fill up this field",
                        })}
                        className="flex-1"
                      />
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        System Information
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Textarea
                          placeholder="Enter system information"
                          className="w-full text-justify"
                          maxLength={maxDescriptionLength}
                          {...register("systemInformation", {
                            required: true,
                            maxLength: maxDescriptionLength,
                          })}
                        />
                        <div className="text-right text-sm text-gray-500">
                          {systemInformationDescription.length}/
                          {maxDescriptionLength}
                        </div>
                      </div>
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        Vision
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Textarea
                          placeholder="Enter company's vision"
                          className="w-full text-justify"
                          maxLength={maxDescriptionLength}
                          {...register("vision", {
                            required: true,
                            maxLength: maxDescriptionLength,
                          })}
                        />
                        <div className="text-right text-sm text-gray-500">
                          {visionDescription.length}/{maxDescriptionLength}
                        </div>
                      </div>
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        Mission
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Textarea
                          placeholder="Enter company's mission"
                          className="w-full text-justify"
                          maxLength={maxDescriptionLength}
                          {...register("mission", {
                            required: true,
                            maxLength: maxDescriptionLength,
                          })}
                        />
                        <div className="text-right text-sm text-gray-500">
                          {missionDescription.length}/{maxDescriptionLength}
                        </div>
                      </div>
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        System Description
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Textarea
                          placeholder="Enter system description"
                          className="w-full text-justify"
                          maxLength={maxDescriptionLength}
                          {...register("systemDescription", {
                            required: true,
                            maxLength: maxDescriptionLength,
                          })}
                        />
                        <div className="text-right text-sm text-gray-500">
                          {systemDescription.length}/{maxDescriptionLength}
                        </div>
                      </div>
                    </div>
                    <div className="sm:flex items gap-2 mt-2">
                      <LucidePenLine size={20} />
                      <Typography fontWeight="semiBold" className="w-48">
                        Version
                      </Typography>
                      <div className="sm:w-80 w-full flex flex-col">
                        <Dropdown
                          onSelectItem={(item) => setSelectedVersion(item)}
                          placeholder="Select Version"
                          items={dummyVersions}
                          selectedItem={selectedVersion}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Button variant="default" size="lg" className="mt-12 w-32">
                      Save | Submit
                    </Button>
                    <Link
                      href={`/admin/web-contents/666839086f2250f4d1cefb84/about-us/edit`}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="mt-12 w-32"
                      >
                        Edit
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

export default Index;
