import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import { LucidePenLine } from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Add Game Fowl Leg Color
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up game fowl leg color</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Leg color title
          </Typography>
        </label>
      </div>
      <Input placeholder="Enter game fowl leg color" className="sm:w-80 w-full" />
      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
            Leg color details
          </Typography>
        </label>
      </div>
      <Textarea
        placeholder="Enter game fowl leg color details"
        className="sm:w-80 w-full"
      />

      <Button variant="default" size="lg" className="mt-32 w-32">
        Save | Submit
      </Button>
    </WidthWrapper>
  );
};

export default index;
