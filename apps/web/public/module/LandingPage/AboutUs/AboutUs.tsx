import { Typography } from "@/common/components/ui/Typography";
import React from "react";

interface IAboutUs {
  breedersLink: string;
  mission: string;
  vision: string;
  systemName: string;
}

const AboutUs = ({ breedersLink, mission, vision, systemName }: IAboutUs) => {
  return (
    <>
      <div >
        <Typography variant="h1" fontWeight="semiBold">
          About Us
        </Typography>
        <Typography variant="h3" fontWeight="semiBold" className="mt-4">
          Breeder's Link
        </Typography>
        <Typography>{breedersLink}</Typography>
      </div>
      <div>
        <Typography variant="h3" fontWeight="semiBold">
          Vision
        </Typography>
        <Typography>{vision}</Typography>
      </div>
      <div>
        <Typography variant="h3" fontWeight="semiBold">
          Mission
        </Typography>
        <Typography>{mission}</Typography>
      </div>
      <div>
        <Typography variant="h3" fontWeight="semiBold">
          {systemName}
        </Typography>
        <pre className="font-sans whitespace-pre-wrap">
          The Gamefowl Breeder Information Management System is a comprehensive
          digital platform designed to assist gamefowl breeders in efficiently
          managing their breeding operations. This system integrates various
          functionalities to streamline the management of breeding records,
          health monitoring, performance tracking, genetic analysis, and
          communication among breeders. The primary objective is to enhance
          breeding practices, ensure the health and performance of gamefowl, and
          foster a collaborative community of breeders. A Game Fowl Breeding
          Information Management System (GFBIMS) is essential to streamline
          operations, improve decision-making, enhance breeding efficiency, and
          build a strong, connected breeding community.
        </pre>
      </div>
    </>
  );
};

export default AboutUs;
