"use client";
import React from "react";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";

export interface IImage {
  imageKey: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: React.ReactNode;
}
interface IEventsProps {
  imageItems: IImage[];
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  onImageClick: (image: IImage) => void;
}
const EventsSection = ({
  title,
  subtitle,
  date,
  imageItems,
  description,
  onImageClick,
}: IEventsProps) => {
  return (
    <>
      <div className="flex flex-col justify-start border-t-2">
        <Typography variant="h2" fontWeight="semiBold" className="mt-2">
          {title} 
        </Typography>
        <Typography variant="h3" className="text-gray-400">
          {subtitle}
        </Typography>
        <p>{date}</p>
        {imageItems.map((items, index) => (
          <Image
            key={index}
            src={items.imageKey || ""}
            alt={`${items.alt}`}
            width={400}
            height={400}
            onClick={() => onImageClick(items)}
            className="object-cover rounded-md mt-4 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          />
        ))}

        <div>
          <Typography variant="h3">{description}</Typography>
        </div>
      </div>
    </>
  );
};

export default EventsSection;
