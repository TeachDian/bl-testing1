"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useMemo, useState } from "react";
import AdsBillboard from "../components/AdsBillboard";
import { Typography } from "@/common/components/ui/Typography";
import EventsModal from "../components/EventsModal";
import { LucideNewspaper, LucideSearch, LucideSquareGantt } from "lucide-react";
import NewsSection, { IImage } from "./NewsSection";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { Spinner } from "@/common/components/ui/Spinner";
import { T_News } from "@repo/contract";
import { Input } from "@/common/components/shadcn/ui/input";
import { Button } from "@/common/components/shadcn/ui/button";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { data, isPending } = useGetWebContents();

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

  const filteredNews = useMemo(() => {
    return webContents?.news?.filter((item: T_News) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const titleMatches = item?.newsTitle
        ?.toLowerCase()
        .includes(lowerCaseQuery);
      const hostMatches = item?.newsHost
        ?.toLowerCase()
        .includes(lowerCaseQuery);
      const eventDatesArray = Array.isArray(item?.newsDate)
        ? item?.newsDate
        : [item?.newsDate];
      const dateMatches = eventDatesArray?.some((date) =>
        new Date(date)
          .toLocaleDateString()
          .toLowerCase()
          .includes(lowerCaseQuery)
      );

      return titleMatches || dateMatches || hostMatches;
    });
  }, [searchQuery, webContents?.news]);

  const totalPages = Math.ceil((filteredNews?.length || 0) / itemsPerPage);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews?.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredNews, itemsPerPage]);

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
                  <LucideNewspaper />
                  <Typography variant="h1" fontWeight="semiBold">
                    News
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
                    {paginatedNews && paginatedNews.length > 0 ? (
                      paginatedNews.map((item: T_News) => (
                        <NewsSection
                          key={item._id}
                          author={item.newsHost}
                          date={item.newsDate}
                          imageItems={item?.photos || []}
                          title={item?.newsTitle}
                          description={item?.newsDescription}
                          onImageClick={handleImageClick}
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
