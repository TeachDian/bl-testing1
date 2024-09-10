"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useState } from "react";
import AdsBillboard from "../components/AdsBillboard";
import { Typography } from "@/common/components/ui/Typography";
import EventsModal from "../components/EventsModal";
import { LucideFilm } from "lucide-react";
import { IImage } from "../Events/EventsSection";
import VideosSection from "./VideosSection";

const videosDummy = [
  {
    id: 1,
    title: "Amenic n Calajoan",
    subtitle: "Tupada Nights present's",
    EventsImageItems: [
      {
        imageKey: "/4.png",
        alt: "Events image",
        width: 500,
        height: 300,
      },
    ],
  },
  {
    id: 2,
    title: "Night of Derbys",
    subtitle: "The main event",
    EventsImageItems: [
      {
        imageKey: "/7.png",
        alt: "Events image",
        width: 500,
        height: 300,
      },
    ],
  },
  {
    id: 3,
    title: "Argeum Colesium",
    subtitle: "Tupada Trend's",
    EventsImageItems: [
      {
        imageKey: "/4.png",
        alt: "Events image",
        width: 500,
        height: 300,
      },
    ],
  },
];

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

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

  return (
    <WidthWrapper width="wide" className="mt-40 mb-36">
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

          {videosDummy.map((item) => (
            <VideosSection
              key={item.id}
              imageItems={item.EventsImageItems}
              title={item.title}
              subtitle={item.subtitle}
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
  );
};

export default index;
