"use client";
import { useState } from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Typography } from "@/common/components/ui/Typography";
import Dropdown from "@/module/LandingPage/components/DropDown";
import { Textarea } from "@/common/components/shadcn/ui/textarea";

interface DropdownItem {
  id: number;
  item: string;
}

const GfType: DropdownItem[] = [
  { id: 1, item: "American fowl type" },
  { id: 2, item: "Filipino fowl type" },
  { id: 3, item: "High-breed fowl type" },
];

const GfTraits: DropdownItem[] = [
  { id: 1, item: "Game fowl traits category" },
  { id: 2, item: "Game fowl traits category" },
  { id: 3, item: "Game fowl traits category" },
];

const CustomDropdown: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [selectedItemSkillsCat, setSelectedItemSkillsCat] =
    useState<DropdownItem | null>(null);

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Edit Game Fowl Traits
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Edit game fowl traits</i>
      </p>
      <div>
        <Dropdown
          items={GfType}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          placeholder="Select game fowl type or breed"
          label="Game Fowl Type"
          className="z-20"
        />
      </div>

      <Dropdown
        items={GfTraits}
        selectedItem={selectedItemSkillsCat}
        onSelectItem={setSelectedItemSkillsCat}
        placeholder="Select game fowl traits category"
        label="Game Fowl Traits Category"
        className="z-10"
      />

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <label htmlFor="gameFowlSkillSet" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Game fowl traits set
          </Typography>
        </label>
      </div>
      <Textarea
        placeholder="Enter game fowl traits set"
        className="sm:w-80 w-full"
      />

      <Button variant="default" size="lg" className="mt-32 w-32">
        Update
      </Button>
    </WidthWrapper>
  );
};

export default CustomDropdown;
