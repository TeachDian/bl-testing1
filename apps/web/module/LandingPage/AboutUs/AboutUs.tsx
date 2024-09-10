import { Spinner } from "@/common/components/ui/Spinner";
import { Typography } from "@/common/components/ui/Typography";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { T_About_Us } from "@repo/contract";
import React from "react";

const AboutUs = () => {
  const { data, isPending } = useGetWebContents();
  const webContents = data?.items[0];


  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div className="space-y-8">
          {webContents?.aboutUs?.map((item: T_About_Us) => (
            <>
              <div key={item._id}>
                <Typography variant="h3" fontWeight="semiBold">
                  {item.systemName}
                </Typography>
                <pre className="font-sans whitespace-pre-wrap text-justify">
                  {item.systemInformation}
                </pre>
              </div>
              <div>
                <Typography variant="h3" fontWeight="semiBold">
                  Vision
                </Typography>
                <pre className="font-sans whitespace-pre-wrap text-justify">
                  {item.vision}
                </pre>
              </div>
              <div>
                <Typography variant="h3" fontWeight="semiBold">
                  Mission
                </Typography>
                <pre className="font-sans whitespace-pre-wrap text-justify">
                  {item.mission}
                </pre>
              </div>
              <div>
                <Typography variant="h3" fontWeight="semiBold">
                  Game Fowl Breeder Information Management System {item.version}
                </Typography>
                <pre className="font-sans whitespace-pre-wrap text-justify">
                  {item.systemDescription}
                </pre>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default AboutUs;
