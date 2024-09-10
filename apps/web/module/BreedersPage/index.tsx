import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import Image from "next/image";
import React from "react";
import gfbims_logo from "../../public/gfbims-logo.png";

const Index = () => {
  return (
    <WidthWrapper width="full" className="space-y-40">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full flex justify-start">
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            Home
          </Typography>
        </div>
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          <Image
            src={gfbims_logo}
            alt={"gfbims logo"}
            layout="responsive"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>
        <div>
          <Typography variant="h1" className="text-center mt-10" fontWeight='semiBold'>
            GAME FOWL BREEDING INFORMATION MANAGEMENT SYSTEM BREEDER MODULE
          </Typography>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Index;
