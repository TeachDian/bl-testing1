import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Typography } from "@/common/components/ui/Typography";
import { LucidePenLine} from "lucide-react";

const index = () => {
  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Edit Game Fowl Federation
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Edit game fowl federation</i>
      </p>

      <div className="mt-12 flex items-center space-x-2 mb-2">
        <LucidePenLine size={20} />
        <label htmlFor="about us" className="sm:text-md">
          <Typography variant="h4" fontWeight="semiBold">
           Federation title
          </Typography>
        </label>
      </div>
      <Input placeholder="National Federation of Gamefowl Breeders, Inc (NFGB)" className="sm:w-80 w-full" />

     
      <Button variant="default" size="lg" className="mt-64 w-32">
        Update
      </Button>
    </WidthWrapper>
  );
};

export default index;
