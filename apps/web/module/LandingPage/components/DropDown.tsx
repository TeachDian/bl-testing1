"use client";
import { useState } from "react";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucideChevronDown, LucideChevronUp, LucidePenLine } from "lucide-react";

export interface DropdownItem {
  _id?: string;
  id: number;
  item: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedItem: DropdownItem | null;
  onSelectItem: (item: DropdownItem) => void;
  placeholder: string;
  label?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItem,
  onSelectItem,
  placeholder,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectItem = (item: DropdownItem) => {
    onSelectItem(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredItems = items.filter((item) =>
    item?.item?.toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <Typography fontWeight="semiBold">{label}</Typography>
      </div>
      <div
        className="flex items-center justify-between border border-gray-300 rounded-md p-2 cursor-pointer w-[320px]"
        onClick={toggleDropdown}
      >
        <Typography>
          {selectedItem ? selectedItem.item : placeholder}
        </Typography>
        <button type="button" className="focus:outline-none">
          {isOpen ? (
            <LucideChevronUp className="h-5 w-5" />
          ) : (
            <LucideChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-[320px] bg-white border border-gray-300 rounded-md shadow-lg p-2 z-50">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border-b border-gray-300 focus:outline-none"
          />
          <ul className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {item.item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
