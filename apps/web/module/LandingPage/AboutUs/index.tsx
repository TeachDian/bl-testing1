"use client";
import React from "react";
import AboutUs from "./AboutUs";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import AdsBillboard from "../components/AdsBillboard";
import { LucideSquareGantt } from "lucide-react";
import { Typography } from "@/common/components/ui/Typography";

const index = () => {
  return (
    <WidthWrapper width="medium" className="mt-40 mb-36">
      <div className="sm:flex w-full gap-4">
        <div className="w-2/3 h-screen flex flex-col space-y-4 ">
          <div className="flex items-center gap-2 pl-4 pr-4">
            <LucideSquareGantt />
            <Typography variant="h1" fontWeight="semiBold">
              About Us
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="border-2 shadow rounded-md  h-auto p-8 flex flex-col">
              <AboutUs/>
            </div>
          </div>
        </div>

        <div className=" h-full flex justify-center items-center">
          <div className="flex justify-center items-center w-full h-full">
            <AdsBillboard
              imageKey={"/4.jpg"}
              width={550}
              height={750}
              alt="ads billboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default index;
