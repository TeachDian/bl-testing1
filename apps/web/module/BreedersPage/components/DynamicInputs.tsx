import React from "react";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";

interface InputField {
  placeholder: string;
  description?: string;
  value: string;
}

interface DynamicInputProps {
  title: string;
  inputs: InputField[];
  onChange: (index: number, value: string) => void;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  title,
  inputs,
  onChange,
}) => {
  const gridClass = "grid-cols-3";

  return (
    <div className="flex items-start mt-4">
      <Typography fontWeight="semiBold" className="w-48 pt-1">
        {title}
      </Typography>
      <div className={`grid ${gridClass} gap-4 flex-1`}>
        {inputs.map((input, index) => (
          <div key={index} className="flex flex-col">
            <Input
              className="w-full"
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => onChange(index, e.target.value)}
            />
            {input.description && (
              <Typography className="text-center mt-1">
                {input.description}
              </Typography>
            )}
          </div>
        ))}
        {Array.from({ length: 3 - inputs.length }).map(
          (
            _,
            i
          ) => (
            <div key={i} className="w-full"></div>
          )
        )}
      </div>
    </div>
  );
};

export default DynamicInput;
