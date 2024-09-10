import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { T_Photo } from "@repo/contract";
import { LucideCalendar, LucideClock4, LucideUserCircle2 } from "lucide-react";
import { Button } from "@/common/components/ui/Button";

interface IEventsProps {
  imageItems: T_Photo[];
  title: string;
  author?: string;
  date?: string | Date;
  description?: string;
  // onImageClick: (image: IImage) => void;
}

const ActivitiesSection = ({
  title,
  author,
  date,
  imageItems,
  description,
  // onImageClick,
}: IEventsProps) => {
  const formatDate = (inputDate: string | Date | undefined) => {
    if (!inputDate) return "";

    const parsedDate =
      typeof inputDate === "string" ? parseISO(inputDate) : inputDate;

    return format(parsedDate, "MMMM dd, yyyy");
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
      {author && (
        <Typography
          variant="h5"
          fontWeight="semiBold"
          className="flex text-gray-600 mb-2 mt-2"
        >
          <LucideUserCircle2 size={18} className="mr-1" /> Posted by: {author}
        </Typography>
      )}
      {date && (
        <Typography
          variant="h5"
          className="flex text-gray-600"
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
              src={"/assets/" + item.key}
              alt={`preview-` + index}
              width={1200}
              height={1200}
              className={`object-cover rounded-md mt-4 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out`}
            />
          ))}
        </div>
      )}

      <div className="w-full">
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

export default ActivitiesSection;
