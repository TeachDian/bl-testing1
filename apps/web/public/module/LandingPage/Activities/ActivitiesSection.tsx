import React from "react";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { T_Photo } from "@repo/contract";

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

  return (
    <div className="flex flex-col justify-start border-t-2">
      <Typography variant="h2" fontWeight="semiBold" className="mt-2">
        {title}
      </Typography>
      {author && (
        <Typography variant="h3" className="text-gray-400">
          {author}
        </Typography>
      )}
      {date && <p>{formatDate(date)}</p>}

      {imageItems.length > 0 && (
        <div>
          {imageItems.map((item, index) => (
            <Image
              src={"/assets/" + item.key}
              alt={`preview-` + index}
              width={400}
              height={400}
              className={`object-cover rounded-md mt-4 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out`}
            />

           
          ))}
        </div>
      )}

      <Typography variant="h3" className="mt-6">{description}</Typography>
    </div>
  );
};

export default ActivitiesSection;
