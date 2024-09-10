import React from "react";
import { Typography } from "./ui/Typography";

const FooterUserPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[120px] bg-gray-300 pt-2">
      <Typography variant="h3" fontWeight="semiBold" className="text-gray-500">
        BREEDER'S LINK
      </Typography>
      <Typography className="text-gray-500">
        Game Fowl Breeder Information Management System
      </Typography>
      <Typography className="text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved
      </Typography>
    </div>
  );
};

export default FooterUserPage;
