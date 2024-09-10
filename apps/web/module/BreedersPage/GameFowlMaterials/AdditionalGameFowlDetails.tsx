import React from "react";
import { Typography } from "@/common/components/ui/Typography"; 

interface AdditionalGameFowlDetailsProps {
  title?: string;
  label: string;
  placeholder: string;
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Add onChange prop
}

const AdditionalGameFowlDetails: React.FC<AdditionalGameFowlDetailsProps> = ({
  title,
  label,
  placeholder,
  value, // Destructure value prop
  onChange, // Destructure onChange prop
}) => {
  return (
    <div className="flex flex-col w-full">
      {title && (
        <div className="mb-4">
          <Typography variant="h2" className="font-semibold text-xl">
            {title}
          </Typography>
          <hr className="border-t-1 border-gray-300 mt-2" />
        </div>
      )}
      <div className="flex items-start space-x-4 w-full">
        <Typography className="font-semibold text-lg w-1/6">
          {label}
        </Typography>
        <textarea
          placeholder={placeholder}
          value={value} // Set the value
          onChange={onChange} // Handle the change
          className="border border-gray-300 rounded-md p-2 w-5/6"
        />
      </div>
    </div>
  );
};

export default AdditionalGameFowlDetails;
