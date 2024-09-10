import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import { DatePickerWithRange } from "@/module/LandingPage/components/Calendar";
import UploadFile from "@/module/LandingPage/components/UploadFile";
import { LucidePenLine, LucideUpload } from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add video
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up videos</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
           Video title
          </Typography>
        </label>
      </div>
      <Input placeholder="Enter slider title" className="sm:w-80 w-full" />

      <div className="mt-4 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Date
          </Typography>
        </label>
      </div>
      <DatePickerWithRange />

      <div className="mt-4 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Embedded code
          </Typography>
        </label>
      </div>
      <Textarea
        placeholder="Enter youtube embedded link"
        className="sm:w-80 w-full"
      />

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
