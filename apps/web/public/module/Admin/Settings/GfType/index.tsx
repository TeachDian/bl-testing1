"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown from "@/module/LandingPage/components/DropDown";

interface DropdownItem {
  id: number;
  item: string;
}

const GfType: DropdownItem[] = [
  { id: 1, item: "American fowl type" },
  { id: 2, item: "Filipino fowl type" },
  { id: 3, item: "High-breed fowl type" },
];


const index: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add Game Fowl Type
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up game fowl type</i>
      </p>
      <div>
        <Dropdown
          items={GfType}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          placeholder="Select game fowl class"
          label="Game Fowl Type"
          className="z-20"
        />
      </div>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <label htmlFor="gameFowlSkillSet" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Game fowl type
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Enter game fowl type"
        className="sm:w-80 w-full"
      />

      <Button variant="default" size="lg" className="mt-32 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
