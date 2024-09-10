"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useState } from "react";
import AdsBillboard from "../components/AdsBillboard";
import { Typography } from "@/common/components/ui/Typography";
import EventsModal from "../components/EventsModal";
import { LucideSquareGantt } from "lucide-react";
import { IImage } from "../Events/EventsSection";
import ActivitiesSection from "./ActivitiesSection";
import { T_Activities, T_Photo } from "@repo/contract";
import { Spinner } from "@/common/components/ui/Spinner";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { cn } from "@/common/helpers/cn";
import Image from "next/image";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const { data, isPending } = useGetWebContents();

  const webContents = data?.items[0];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (image: IImage) => {
    setSelectedImage(image);
    openModal();
  };

  console.log("WebContents:", webContents);

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="wide" className="mt-40 mb-36">
          <div className="sm:flex w-full gap-4">
            <div className="sm:w-2/3 space-y-8">
              <div className="flex items-center gap-4">
                <Typography
                  variant="h1"
                  fontWeight="semiBold"
                  className="flex items-center"
                >
                  Activities
                </Typography>
                <LucideSquareGantt />
              </div>

              {webContents?.activities.map((item: T_Activities) => {
                console.log("Activity Item:", item);
                console.log("Activity Photos:", item.photos);
                return (
                  <ActivitiesSection
                    key={item._id}
                    imageItems={item.photos || []}
                    title={item.activityTitle}
                    author={item.activityHost}
                    date={item.activityDate}
                    description={item.activityDescription}
                    // onImageClick={handleImageClick}
                  />
                );
              })}

              <EventsModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                selectedImage={selectedImage}
              >
                Image modal
              </EventsModal>
            </div>
            <div className="sm:relative sm:w-1/3 bg-white">
              <div className="flex justify-center items-center sm:min-h-screen mx-auto">
                <div className="sm:fixed sm:top-40 mt-10 sm:mt-0">
                  <AdsBillboard
                    imageKey={"/4.jpg"}
                    width={400}
                    height={250}
                    alt="ads billboard"
                    className="w-full object-cover"
                  />
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
