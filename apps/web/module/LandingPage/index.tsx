"use client";
import React from "react";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import AdvertisementSection from "./AdvertisementSection";
import {
  LucideCalendarCheck2,
  LucideFilm,
  LucideNewspaper,
  LucideSquareGantt,
} from "lucide-react";
import useGetWebContents from "@/common/hooks/Web-Contents/useGetWebContents";
import { Spinner } from "@/common/components/ui/Spinner";
import CarouselImage from "./CarouselImage";
import { Typography } from "@/common/components/ui/Typography";
import CarouselImageSmall from "./components/CarouselImageSmall";
import { T_Photo } from "@repo/contract";

const Index = () => {
  const { data, isPending } = useGetWebContents();
  const webContents = data?.items[0];

  // Sort events by date and get the three most recent
  const recentEvents = webContents?.events
    ?.sort(
      (a: any, b: any) =>
        new Date(b.eventDates[0]).getTime() -
        new Date(a.eventDates[0]).getTime()
    )
    ?.slice(0, 3);

  // Sort activities by date and get the three most recent
  const recentActivities = webContents?.activities
    ?.sort(
      (a: any, b: any) =>
        new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
    )
    ?.slice(0, 3);

  // Sort news by date and get the three most recent
  const recentNews = webContents?.news
    ?.sort(
      (a: any, b: any) =>
        new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()
    )
    ?.slice(0, 3);

  const AdvertisementVideos = [
    { id: 1, imageKey: "/videos1.png", title: "Video 1" },
    { id: 2, imageKey: "/videos2.png", title: "Video 2" },
    { id: 3, imageKey: "/videos3.png", title: "Video 3" },
  ];

  return (
    <>
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <WidthWrapper width="wide" className="mt-32 mb-36">
          <div className="flex flex-col lg:flex-row w-full p-4 gap-2">
            <div className="lg:w-2/3">
              {webContents?.sliders?.length > 0 ? (
                <CarouselImage
                  imageItems={webContents.sliders.flatMap(
                    (item: { photos: T_Photo[] }) => item.photos
                  )}
                />
              ) : (
                <div className="flex justify-center items-center">
                  <Typography
                    variant="h2"
                    fontWeight="semiBold"
                    className="mt-40 text-center text-gray-400"
                  >
                    No Data Available
                  </Typography>
                </div>
              )}
            </div>

            <div className="sm:w-full">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  {webContents?.sliders?.length > 0 ? (
                    <CarouselImageSmall
                      imageItems={webContents.sliders.flatMap(
                        (item: { photos: T_Photo[] }) => item.photos
                      )}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <Typography
                        variant="h2"
                        fontWeight="semiBold"
                        className="mt-40 text-center text-gray-400"
                      >
                        No Data Available
                      </Typography>
                    </div>
                  )}
                </div>
                <div>
                  {webContents?.sliders?.length > 0 ? (
                    <CarouselImageSmall
                      imageItems={webContents.sliders.flatMap(
                        (item: { photos: T_Photo[] }) => item.photos
                      )}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <Typography
                        variant="h2"
                        fontWeight="semiBold"
                        className="mt-40 text-center text-gray-400"
                      >
                        No Data Available
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <AdvertisementSection
              title="RECENT EVENTS"
              icon={<LucideCalendarCheck2 size={30} />}
              images={
                recentEvents && recentEvents.length > 0
                  ? recentEvents.map((event: any) => ({
                      src: event.photos[0].key, // Assuming `key` is the field storing the object ID or key for the image
                      title: event.eventTitle,
                    }))
                  : [{ src: "placeholder.png", title: "No Events" }]
              }
            />

            <AdvertisementSection
              title="RECENT ACTIVITIES"
              icon={<LucideCalendarCheck2 size={30} />}
              images={
                recentActivities && recentActivities.length > 0
                  ? recentActivities.map((activity: any) => ({
                      src: activity.photos[0]?.key,
                      title: activity.activityTitle,
                    }))
                  : [{ src: "/placeholder.png", title: "No Activities" }]
              }
            />
            <AdvertisementSection
              title="RECENT NEWS"
              icon={<LucideNewspaper size={30} />}
              images={
                recentNews && recentNews.length > 0
                  ? recentNews.map((news: any) => ({
                    src: news.photos[0]?.key,
                      title: news.newsTitle,
                    }))
                  : [{ src: "/placeholder.png", title: "No News" }]
              }
            />
            <AdvertisementSection
              title="RECENT VIDEOS"
              icon={<LucideFilm size={30} />}
              images={AdvertisementVideos.map((image) => ({
                src: image.imageKey,
                title: image.title,
              }))}
            />
          </div>
        </WidthWrapper>
      )}
    </>
  );
};

export default Index;
