"use client";
import React from "react";
import { Typography } from "@/common/components/ui/Typography";
import { convertToEmbedURL } from "@/common/helpers/convertToEmbedURL";

export interface IImage {
  imageKey: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: React.ReactNode;
}

interface IEventsProps {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  videoLink?: string;
  onImageClick: (image: IImage) => void;
}

const VideosSection = ({
  title,
  subtitle,
  date,
  description,
  videoLink,
  onImageClick,
}: IEventsProps) => {
  const embedUrl = videoLink ? convertToEmbedURL(videoLink) : null;

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
        <div>
          <Typography variant="h3">{description}</Typography>
        </div>
        {embedUrl && (
          <div className="mt-4">
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default VideosSection;
