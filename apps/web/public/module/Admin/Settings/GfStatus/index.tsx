"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { LucidePenLine } from "lucide-react";
import { useState } from "react";

interface DropdownItem {
  id: number;
  item: string;
}

const GfStatus: DropdownItem[] = [
  { id: 1, item: "Female" },
  { id: 2, item: "Male" },
];

const index = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add Game Fowl Status
      </Typography>
      <p className="text-gray-400">
        <i>Set up game fowl status</i>
      </p>

      <div>
        <Dropdown
          items={GfStatus}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          placeholder="Select game fowl gender"
          label="Game Fowl Type"
          className="z-20"
        />
      </div>

      <div className=" flex items-center space-x-2 mt-8">
        <LucidePenLine size={20} />
        <label htmlFor="game fowl status" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Game Fowl Status
          </Typography>
        </label>
      </div>
      <Input placeholder="Enter game fowl status" className="sm:w-80 w-full" />

      <div className=" flex items-center space-x-2 mb-2 mt-8">
        <LucidePenLine size={20} />
        <label htmlFor="game fowl status" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Age Range
          </Typography>
        </label>
      </div>
      <Input placeholder="Enter game fowl age" className="sm:w-80 w-full" />

      <div className=" flex items-center space-x-2 mb-2 mt-8">
        <LucidePenLine size={20} />
        <label htmlFor="game fowl status" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Description
          </Typography>
        </label>
      </div>
      <Textarea placeholder="Enter game fowl description" className="sm:w-80 w-full" />

      <Button variant="default" size="lg" className="mt-32 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
