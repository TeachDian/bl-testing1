"use client";
import { Button } from "@/common/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/shadcn/ui/dropdown-menu";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import Dropdown from "@/module/LandingPage/components/DropDown";
import Affiliation from "../../components/Affiliation";
import {
  LucideBookUser,
  LucideCalendarCheck2,
  LucideChevronDown,
  LucideCircleUser,
  LucideLink,
  LucideTractor,
} from "lucide-react";
import React, { useState } from "react";

interface DropdownItem {
  id: number;
  item: string;
}

const Federation: DropdownItem[] = [
  { id: 1, item: "American fowl type" },
  { id: 2, item: "Filipino fowl type" },
  { id: 3, item: "High-breed fowl type" },
];
const LocalAssociation: DropdownItem[] = [
  { id: 1, item: "Association 1" },
  { id: 2, item: "Association 2" },
  { id: 3, item: "Association 3" },
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [selectedLocalAssociation, setSelectedLocalAssociation] =
    useState<DropdownItem | null>(null);

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideBookUser size={25} />
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            {" "}
            Breeder Farm Details
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideCircleUser size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Farm Owner Details
            </Typography>
          </div>

          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600">
              <div className="sm:flex items-center">
                <Typography fontWeight="semiBold" className="w-48">
                  Farmer owner's full name
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Nationality
                </Typography>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-lg border w-48 flex items-center justify-between gap-2 p-2">
                    Select nationality <LucideChevronDown size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Filipino</DropdownMenuItem>
                    <DropdownMenuItem>American</DropdownMenuItem>
                    <DropdownMenuItem>Español</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Telephone number
                </Typography>
                <Input className="flex-1" type="number" />
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Mobile number
                </Typography>
                <Input className="flex-1" type="number" />
              </div>
              <div className="sm:flex items-center sm:mb-4">
                <Typography fontWeight="semiBold" className="w-48">
                  Email address
                </Typography>
                <Input className="flex-1" type="email" />
              </div>
            </div>

            <div className="items-stretch col-span-12 text-gray-600 mt-4">
              <div className="flex gap-2 items-center">
                <LucideTractor size={20} className="text-gray-900" />
                <Typography
                  variant="h3"
                  fontWeight="semiBold"
                  className="text-gray-900"
                >
                  Farm Details
                </Typography>
              </div>

              <div className="border-b py-2 w-full"></div>
              <div className="sm:flex items-center pt-6 mt-3">
                <Typography fontWeight="semiBold" className="w-48">
                  Farmer name
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="sm:flex mt-4">
                <Typography fontWeight="semiBold" className="w-48 pt-2">
                  Farmer Location
                </Typography>
                <div className="flex-1 mr-4">
                  <Input className="w-full" />
                  <Typography className=" italic mx-auto flex justify-center">
                    Street, House Number, Street Name, Apartment, Suite
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input className="w-full" />
                  <Typography className=" italic mx-auto flex justify-center">
                    Barangay
                  </Typography>
                </div>
              </div>
              <div className="sm:flex items-center mt-4">
                <div className="w-48"></div>
                <div className="flex-1 mr-4">
                  <Input className="w-full" />
                  <Typography className=" italic mx-auto flex justify-center">
                    City / Town
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input className="w-full" />
                  <Typography className=" italic mx-auto flex justify-center">
                    State/ Country/ Province
                  </Typography>
                </div>
              </div>
              <div className="sm:flex items-center mt-4">
                <div className="w-48"></div>
                <div className="flex-1 mr-4">
                  <Input className="w-full" />
                  <Typography className=" italic mx-auto flex justify-center">
                    Region / Country
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input className="w-full" />
                  <Typography className="mt-2 italic mx-auto flex justify-center">
                    Zip Code
                  </Typography>
                </div>
              </div>

              <div className="sm:flex mt-4">
                <div className="w-48">
                  <Typography fontWeight="semiBold" className="w-48">
                    Farm Photos
                  </Typography>
                </div>
                <div className="flex-1 mr-4 ">
                  <div className="bg-gray-200 h-72 rounded-md"></div>
                  <Typography className="mt-2 italic">
                    File extension: jpg, png, pixel size 1080*720
                  </Typography>
                </div>
                <div className="flex-1 ">
                  <div className="bg-gray-200 h-72 rounded-md"></div>
                  <Typography className="mt-2 italic">
                    File extension: jpg, png, pixel size 1080*720
                  </Typography>
                </div>
              </div>
              <div className="sm:flex pt-6 mt-3">
                <Typography fontWeight="semiBold" className="w-48">
                  Farmer Description
                </Typography>
                <Textarea className="flex-1" />
              </div>
            </div>

            <div className="items-stretch col-span-12 text-gray-600 mt-8">
              <div className="flex gap-2 items-center">
                <LucideLink size={20} className="text-gray-900" />
                <Typography
                  variant="h3"
                  fontWeight="semiBold"
                  className="text-gray-900"
                >
                  Affiliations
                </Typography>
              </div>

              <div className="border-b py-2 w-full"></div>
              <div className="sm:flex items-center mt-8">
                <Typography fontWeight="semiBold" className="w-48">
                  Federation
                </Typography>
                <Dropdown
                  items={Federation}
                  selectedItem={selectedItem}
                  onSelectItem={setSelectedItem}
                  placeholder="Select Federation"
                  className="z-50"
                />
              </div>
              <div className="sm:flex items-center mt-4">
                <Typography fontWeight="semiBold" className="w-48">
                  Local Association
                </Typography>
                <Dropdown
                  items={LocalAssociation}
                  selectedItem={selectedLocalAssociation}
                  onSelectItem={setSelectedLocalAssociation}
                  placeholder="Select Local Association"
                  className="z-10"
                />
              </div>
            </div>
            <div className="items-stretch col-span-12 text-gray-600 mt-8">
              <div className="flex gap-2 items-center">
                <LucideCalendarCheck2 size={20} className="text-gray-900" />
                <Typography
                  variant="h3"
                  fontWeight="semiBold"
                  className="text-gray-900"
                >
                  Visitation Schedule
                </Typography>
              </div>
              <div className="border-b py-2 w-full"></div>
              <div className="sm:flex mt-8">
                <Typography fontWeight="semiBold" className="w-48 pt-2">
                  Day
                </Typography>
                <div className="flex-1 mr-4">
                  <Input className="w-full" />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="sm:flex mt-4">
                <Typography fontWeight="semiBold" className="w-48 pt-2">
                  Time
                </Typography>
                <div className="flex-1 mr-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input className="w-full flex flex-col" type="time" />
                    </div>
                    <div className="flex-1">
                      <Input className="w-full flex flex-col" type="time" />
                    </div>
                  </div>
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="sm:flex mt-4">
                <Typography fontWeight="semiBold" className="w-48 pt-2">
                  Contact Person
                </Typography>
                <div className="flex-1 mr-4">
                  <Input className="w-full" />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="sm:flex mt-4">
                <Typography fontWeight="semiBold" className="w-48 pt-2">
                  Contact Number
                </Typography>
                <div className="flex-1 mr-4">
                  <Input className="w-full" type="number" />
                </div>
                <div className="flex-1"></div>
              </div>

              <div className="grid place-items-start">
                <Button
                  variant="default"
                  size="lg"
                  className="sm:mt-56 mt-8 w-32"
                >
                  Save | Submit
                </Button>
              </div>
              <div className="flex flex-col w-full mt-4 space-y-4">
                <Affiliation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Index;
