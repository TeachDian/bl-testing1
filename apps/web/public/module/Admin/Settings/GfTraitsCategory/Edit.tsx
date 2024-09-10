import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucidePenLine} from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Edit Game Fowl Traits Category
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Edit game fowl traits category</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
           Traits category
          </Typography>
        </label>
      </div>
      <Input placeholder="Plumage" className="sm:w-80 w-full" />

     
      <Button variant="default" size="lg" className="mt-64 w-32">
        Update
      </Button>
    </WidthWrapper>
  );
};

export default index;
