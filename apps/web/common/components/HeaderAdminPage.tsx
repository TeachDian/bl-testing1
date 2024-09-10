"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/shadcn/ui/dropdown-menu";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideBell,
  LucideChevronDown,
  LucideGanttChart,
  LucideScan,
  LucideSearch,
  LucideSettings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderAdminPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-[100px] border bg-white py-4 pr-4 pl-4  fixed top-0 left-0 right-0 z-50">
        <div className="flex w-full md:w-3/4 items-center justify-start gap-12 ">
          <div className="flex gap-4 ">
            <div className="flex items-center">
              <Image
                src="/rooster.jpg"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full border-2"
              />
            </div>

            <div className="flex">
              <div className="flex-none">
                <Typography variant="h1" fontWeight="semiBold">
                  BREEDER'S LINK
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="semiBold"
                  className="flex-none"
                >
                  Make it simple!
                </Typography>
              </div>
            </div>
          </div>
          <div className="h-full flex justify-center items-center">
           
            <input
              type="text"
              placeholder="Search..."
              className=" border text-gray-700 border-gray-300 py-1 px-4 focus:outline-none rounded-full ml-16"
            />
            <button className=" text-gray-700 font-bold py-1 px-2">
              <LucideSearch />
            </button>
          </div>
        </div>

        <div className="h-full flex justify-center gap-8 items-center ml-auto">
          <LucideScan size={25} />
          <LucideBell size={25} />
          <div className="flex items-center gap-2">
            <Image
              src="/rooster.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full border-2"
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2">
                  <Typography fontWeight="semiBold">Admin</Typography>
                  <LucideChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <LucideSettings size={25} />
        </div>
      </div>
  
    </>
  );
};

export default HeaderAdminPage;
