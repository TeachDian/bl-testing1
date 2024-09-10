import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import UploadFile from "@/module/LandingPage/components/UploadFile";
import { LucidePenLine, LucideUpload } from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add slider
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up slider for picture sliders in landing page</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
           Slider title
          </Typography>
        </label>
      </div>
      <Input placeholder="Enter slider title" className="sm:w-80 w-full" />

      <div className="mt-8 flex items-center space-x-2 mb-2">
        <LucideUpload size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Picture
          </Typography>
        </label>
      </div>
      <UploadFile />
      

      <Button variant="default" size="lg" className="mt-12 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
