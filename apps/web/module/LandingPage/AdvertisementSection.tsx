import { Typography } from "@/common/components/ui/Typography";
import React from "react";
import Image from "next/image";
import { T_Photo } from "@repo/contract";

interface AdvertisementSectionProps {
  title: string;
  images: { src: string; title: string }[];
  icon: React.ReactNode;
}

const AdvertisementSection: React.FC<AdvertisementSectionProps> = ({
  title,
  images,
  icon,
}) => {
  return (
    <>
      <div className="mt-16 text-center">
        <div className="flex items-center p-4 gap-4">
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center gap-4"
          >
            {title} {icon}
          </Typography>
        </div>
      </div>
      <div className="sm:flex w-full items-center justify-between p-4 sm:gap-8 ">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col h-1/2 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Image
              src={`/assets/${image.src}`}
              alt={`Image ${index}`}
              width={400}
              height={400}
              className="rounded-md object-cover"
            />
            <Typography variant="h3" fontWeight="semiBold" className="mt-2">
              {image.title}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdvertisementSection;