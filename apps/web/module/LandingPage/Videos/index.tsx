"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useState } from "react";
import AdsBillboard from "../components/AdsBillboard";
import { Typography } from "@/common/components/ui/Typography";
import EventsModal from "../components/EventsModal";
import { LucideFilm } from "lucide-react";
import { IImage } from "../Events/EventsSection";
import VideosSection from "./VideosSection";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { Spinner } from "@/common/components/ui/Spinner";
import { T_Videos } from "@repo/contract";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const { data, isPending } = useGetWebContents();

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

  const webContents = data?.items[0];

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="medium" className="mt-40 mb-36">
          <div className="sm:flex w-full gap-4">
            <div className=" sm:w-2/3 space-y-8 ">
              <div className="flex items-center gap-4">
                <Typography
                  variant="h1"
                  fontWeight="semiBold"
                  className="flex items-center"
                >
                  Videos
                </Typography>
                <LucideFilm />
              </div>

              {webContents?.videos?.map((item: T_Videos) => (
                <VideosSection
                  key={item._id}
                  title={item.videoTitle}
                  subtitle={item.videoDescription}
                  videoLink={item.videoLink}
                  onImageClick={handleImageClick}
                />
              ))}
              <EventsModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                selectedImage={selectedImage}
              >
                Image modal
              </EventsModal>
            </div>
            <div className="sm:relative sm:w-1/3 bg-white ">
              <div className="flex justify-center items-center sm:min-h-screen mx-auto">
                <div className="sm:fixed sm:top-40 mt-10 sm:mt-0">
                  <AdsBillboard
                    imageKey={"/4.jpg"}
                    width={550}
                    height={750}
                    alt="ads billboard"
                    className="w-full h-full object-cover"
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
