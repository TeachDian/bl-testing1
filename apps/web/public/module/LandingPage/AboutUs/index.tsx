"use client";
import React from "react";
import AboutUs from "./AboutUs";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import AdsBillboard from "../components/AdsBillboard";

const index = () => {
  return (
    <WidthWrapper width="wide" className="mt-40 mb-36">
      <div className="sm:flex w-full gap-4">
        <div className="sm:w-2/3 space-y-8">
          <AboutUs
            breedersLink={"Information about Breeders Link company"}
            mission={"Information about Breeders Link company"}
            vision={"Information about Breeders Link company"}
            systemName={
              "Game Fowl Breeder Information Management System Version 1.0"
            }
          />
        </div>
        <div className="sm:relative sm:w-1/3 bg-white ">
          <div className=" flex justify-center items-center sm:min-h-screen mx-auto">
            <div className="sm:fixed sm:top-40 mt-10 sm:mt-0">
              <AdsBillboard
                imageKey={"/4.jpg"}
                width={400}
                height={250}
                alt="ads billboard"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default index;
