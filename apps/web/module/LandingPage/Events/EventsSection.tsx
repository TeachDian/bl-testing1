import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import { format, parseISO, isValid } from "date-fns";
import { T_Photo } from "@repo/contract";
import { LucideCalendar, LucideClock4 } from "lucide-react";

export interface IImage {
  imageKey: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: React.ReactNode;
}

interface IEventsProps {
  imageItems: T_Photo[];
  title: string;
  author?: string;
  date?: string | string[] | Date | Date[];
  description?: string;
  // onImageClick: (image: IImage) => void;
}

const EventsSection = ({
  title,
  date,
  imageItems,
  description,
  // onImageClick,
}: IEventsProps) => {
  const formatDate = (
    date: string | string[] | Date | Date[] | undefined
  ): string | undefined => {
    if (!date) return undefined;

    const dates = Array.isArray(date) ? date : [date];

    const formattedDates = dates.map((d) => {
      const parsedDate = typeof d === "string" ? parseISO(d) : d;
      return isValid(parsedDate)
        ? format(parsedDate, "MMMM d, yyyy")
        : "Invalid Date";
    });

    return formattedDates.join(" - ");
  };

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const truncatedDescription =
    description && description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className="space-y-8">
    <div className="flex flex-col justify-start">
      <Typography
        variant="h3" fontWeight="semiBold"
      >
        {title}
      </Typography>

      {date && (
        <Typography
          variant="h5"
          className="flex text-gray-600 mt-2"
          fontWeight="semiBold"
        
        >
          <LucideCalendar size={18} className="mr-1" />
          {formatDate(date)}
        </Typography>
      )}

      {imageItems.length > 0 && (
        <div>
          {imageItems.map((item, index) => (
            <Image
              key={index}
              src={"/assets/" + item.key}
              alt={`preview-${index}`}
              width={1200}
              height={1200}
              className={`object-cover rounded-md mt-4 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out`}
            />
          ))}
        </div>
      )}

      <div className="w-3/4">
      <pre className="font-sans whitespace-pre-wrap mt-6 text-justify">
          {showMore ? description : truncatedDescription}
        </pre>
        {description && description.length > 100 && (
          <button
            className="underline mt-2 font-semibold text-blue-900"
            onClick={toggleShowMore}
          >
            {showMore ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default EventsSection;
