import { Button } from "@/common/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/shadcn/ui/dropdown-menu";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import {
  LucideBookOpen,
  LucideChevronDown,
  LucideUserCircle,
} from "lucide-react";
import React from "react";

const Index = () => {
  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideUserCircle size={25}/>
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            {" "}
            Breeder Profile
          </Typography>
        </div>
        <div className="border-2 shadow rounded-md sm:h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Breeder Information
            </Typography>
          </div>

          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600">
              <div className="sm:flex items-center">
                <Typography fontWeight="semiBold" className="w-48">
                  Breeder's full name
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
                  Email address
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Telephone number
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Mobile number
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="sm:flex items-center ">
                <Typography fontWeight="semiBold" className="w-48">
                  Billing address
                </Typography>
                <Input className="flex-1" />
              </div>
              <div className="grid place-items-start ">
                <Button
                  variant="default"
                  size="lg"
                  className="sm:mt-56 mt-8 w-32"
                >
                  Save | Submit
                </Button>
              </div>
            </div>
            <div className="col-span-4 mt-4 sm:mt-0">
              <div className="flex flex-col sm:items-center space-y-4 ">
                <div className=" flex bg-gray-300 w-40 h-40 text-center items-center justify-center mx-auto">
                  Breeder photo
                </div>
                <Button className="flex justify-center mx-auto">Upload</Button>
                <Typography className="text-sm text-gray-500 text-center mx-auto">
                  File Size: Maximum of 1MB
                  <br />
                  File Extension: png, jpg
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Index;
