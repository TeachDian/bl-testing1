"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useMemo, useState } from "react";
import AdsBillboard from "../components/AdsBillboard";
import { Typography } from "@/common/components/ui/Typography";
import EventsModal from "../components/EventsModal";
import { LucideFileClock, LucideSearch, LucideSquareGantt } from "lucide-react";
import { IImage } from "../Events/EventsSection";
import ActivitiesSection from "./ActivitiesSection";
import { T_Activities, T_Photo } from "@repo/contract";
import { Spinner } from "@/common/components/ui/Spinner";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { Input } from "@/common/components/shadcn/ui/input";
import { Button } from "@/common/components/shadcn/ui/button";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const { data, isPending } = useGetWebContents();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const webContents = data?.items[0];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (image: IImage) => {
    setSelectedImage(image);
    openModal();
  };

  console.log("WebContents:", webContents);

  const filteredActivities = useMemo(() => {
    return webContents?.activities?.filter((item: T_Activities) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const titleMatches = item?.activityTitle
        ?.toLowerCase()
        .includes(lowerCaseQuery);
      const hostMatches = item?.activityHost
        ?.toLowerCase()
        .includes(lowerCaseQuery);

      const dateMatches = item?.activityDate
        ? new Date(item.activityDate)
            .toLocaleDateString()
            .toLowerCase()
            .includes(lowerCaseQuery)
        : false;

      return titleMatches || dateMatches || hostMatches;
    });
  }, [searchQuery, webContents?.events]);

  const totalPages = Math.ceil(
    (filteredActivities?.length || 0) / itemsPerPage
  );

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities?.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredActivities, itemsPerPage]);

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="medium" className="mt-40 mb-36">
          <div className="sm:flex w-full gap-4">
            <div className=" lg:w-2/3 w-full h-screen flex flex-col space-y-4 ">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 pl-4 pr-4">
                  <LucideFileClock />
                  <Typography variant="h1" fontWeight="semiBold">
                    Activities
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center text-gray-500">
                    <label htmlFor="itemsPerPage" className="mr-2">
                      Items:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1 border p-4 rounded-sm hover:cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  <div className="relative w-80">
                    <LucideSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="p-2 pl-10 border-2 rounded w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="border-2 shadow rounded-md  h-auto p-8 sm:flex w-full">
                  <div className=" flex-grow space-y-8 ">
                    {paginatedActivities && paginatedActivities.length > 0 ? (
                      paginatedActivities.map((item: T_Activities) => (
                        <ActivitiesSection
                          key={item._id}
                          imageItems={item.photos || []}
                          title={item.activityTitle}
                          author={item.activityHost}
                          date={item.activityDate}
                          description={item.activityDescription}
                          // onImageClick={handleImageClick}
                        />
                      ))
                    ) : (
                      <div className="flex justify-center items-center">
                        <Typography
                          variant="h2"
                          fontWeight="semiBold"
                          className="mt-40 text-center text-gray-500"
                        >
                          No Data Available
                        </Typography>
                      </div>
                    )}
                    <EventsModal
                      isModalOpen={isModalOpen}
                      onClose={closeModal}
                      selectedImage={selectedImage}
                    >
                      Image modal
                    </EventsModal>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 px-4">
                <Button
                  variant="default"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-700 rounded-md disabled:opacity-50 text-white max-w-[100px]"
                >
                  Previous
                </Button>
                <Typography variant="p" fontWeight="semiBold">
                  Page {currentPage} of {totalPages}
                </Typography>
                <Button
                  variant="default"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-700 rounded-md disabled:opacity-50 text-white max-w-[100px]"
                >
                  Next
                </Button>
              </div>
            </div>

            <div className=" lg:w-1/3 w-full h-full flex justify-center items-center pt-12">
              <div className="flex justify-center items-center w-full h-full">
                <div className="sm:fixed sm:top-40 mt-10 sm:mt-0">
                  <AdsBillboard
                    imageKey={"/4.jpg"}
                    width={550}
                    height={750}
                    alt="ads billboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default index;
