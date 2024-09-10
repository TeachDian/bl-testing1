import { WidthWrapper } from "@/common/components/WidthWrapper";
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
import UploadFile from "@/module/LandingPage/components/UploadFile";
import { LucideChevronDown, LucidePenLine, LucideUpload } from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add Advertisements
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Add billboard advertisements</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Billboard Advertisement Title
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Enter ads or billboard title"
        className="sm:w-80 w-full"
      />

      <div className="mt-8 flex items-center space-x-2 mb-2">
        <LucideUpload size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Billboard Advertisement Photo
          </Typography>
        </label>
      </div>
      <UploadFile/>
      <div className="mt-8 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Location
          </Typography>
        </label>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border flex items-center gap-2 w-72 mt-4 p-2">
          Select ads or billboard location <LucideChevronDown size={20} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Location 1</DropdownMenuItem>
          <DropdownMenuItem>Location 2</DropdownMenuItem>
          <DropdownMenuItem>Location 3</DropdownMenuItem>
          <DropdownMenuItem>Location 4</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="default" size="lg" className="mt-12 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
