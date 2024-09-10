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
import { LucideChevronDown, LucidePenLine } from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        About us
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up information "About us" page for landing page</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Breeder's Link
          </Typography>
        </label>
      </div>
      <Input placeholder="What is Breeders Link?" className="sm:w-80 w-full" />

      <div className="mt-4 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Vision
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Describe your company's vision"
        className="sm:w-80 w-full"
      />
      <div className="mt-4 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Mission
          </Typography>
        </label>
      </div>
      <Input
        placeholder="Describe your company's mission"
        className="sm:w-80 w-full"
      />

      <div className="mt-4 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            GFBIMS Information
          </Typography>
        </label>
      </div>
      <Textarea
        placeholder="Input information about GFBIMS"
        className="sm:w-80 w-full"
      />

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border flex items-center gap-2 w-40 mt-4 p-2">
          Select Version <LucideChevronDown size={20} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Version 1.0</DropdownMenuItem>
          <DropdownMenuItem>Version 2.0</DropdownMenuItem>
          <DropdownMenuItem>Version 3.0</DropdownMenuItem>
          <DropdownMenuItem>Version 4.0</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="default" size="lg" className="mt-12 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
