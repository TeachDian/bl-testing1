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
  { id: 1, item: "Game Fowl Federation" },
  { id: 2, item: "Game Fowl Federation" },
  { id: 3, item: "Game Fowl Federation" },
];


const index: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Edit Local Association
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Edit local association</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <label htmlFor="gameFowlSkillSet" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Local Association
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Enter game fowl local association"
        className="sm:w-80 w-full"
      />

      <div>
        <Dropdown
          items={GfType}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          placeholder="Select game fowl federation"
          label="Federation"
          className="z-20"
        />
      </div>

     

      <Button variant="default" size="lg" className="mt-32 w-32">
        Update
      </Button>
    </WidthWrapper>
  );
};

export default index;
