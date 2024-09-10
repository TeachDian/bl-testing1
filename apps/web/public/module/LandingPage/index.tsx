import React from "react";
import CarouselImage from "./CarouselImage";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import AdvertisementSection from "./AdvertisementSection";
import {
  LucideCalendarCheck2,
  LucideFilm,
  LucideNewspaper,
  LucideSquareGantt,
} from "lucide-react";
import { Carousel } from "@/common/components/shadcn/ui/carousel";
import CarouselImageSmall from "./components/CarouselImageSmall";

const SliderImage = [
  {
    id: 1,
    alt: "ads image",
    imageKey: "/14.jpg",
  },
  {
    id: 2,
    alt: "ads image",
    imageKey: "/13.jpg",
  },
  {
    id: 3,
    alt: "ads image",
    imageKey: "/4.jpg",
  },
  {
    id: 4,
    alt: "ads image",
    imageKey: "/14.jpg",
  },
  {
    id: 5,
    alt: "ads image",
    imageKey: "/12.png",
  },
];

const SliderImage1 = [
  {
    id: 1,
    alt: "ads image",
    imageKey: "/13.jpg",
  },
  {
    id: 2,
    alt: "ads image",
    imageKey: "/4.jpg",
  },
  {
    id: 3,
    alt: "ads image",
    imageKey: "/14.jpg",
  },
  {
    id: 4,
    alt: "ads image",
    imageKey: "/13.jpg",
  },
  {
    id: 5,
    alt: "ads image",
    imageKey: "/12.png",
  },
];
const SliderImage2 = [
  {
    id: 1,
    alt: "ads image",
    imageKey: "/14.jng",
  },
  {
    id: 2,
    alt: "ads image",
    imageKey: "/13.jpg",
  },
  {
    id: 3,
    alt: "ads image",
    imageKey: "/4.jpg",
  },
  {
    id: 4,
    alt: "ads image",
    imageKey: "/13.jpg",
  },
  {
    id: 5,
    alt: "ads image",
    imageKey: "/12.png",
  },
];

const AdvertisementEvents = [
  {
    id: 1,
    imageKey: "/3.png",
  },
  {
    id: 2,
    imageKey: "/4.png",
  },
  {
    id: 3,
    imageKey: "/7.png",
  },
];

const AdvertisementActivities = [
  {
    id: 1,
    imageKey: "/3.png",
  },
  {
    id: 2,
    imageKey: "/4.png",
  },
  {
    id: 3,
    imageKey: "/7.png",
  },
];
const AdvertisementNews = [
  {
    id: 1,
    imageKey: "/news1.jpg",
  },
  {
    id: 2,
    imageKey: "/news2.png",
  },
  {
    id: 3,
    imageKey: "/news2.png",
  },
];

const AdvertisementVideos = [
  {
    id: 1,
    imageKey: "/videos1.png",
  },
  {
    id: 2,
    imageKey: "/videos2.png",
  },
  {
    id: 3,
    imageKey: "/videos3.png",
  },
];

const Index = () => {
  return (
    <WidthWrapper width="wide" className="mt-32 mb-36">
      <div className="flex flex-col lg:flex-row w-full p-4 gap-2">
        <div className="lg:w-2/3">
          <CarouselImage
            images={SliderImage}
            width={1000}
            height={300}
            className="h-[700]"
          />
        </div>

        <div className=" sm:w-full">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <CarouselImageSmall images={SliderImage1} width={470} height={150} />
            </div>
            <div>
              <CarouselImageSmall images={SliderImage2} width={470} height={150} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <AdvertisementSection
          title="RECENT EVENTS"
          icon={<LucideCalendarCheck2 size={30} />}
          titleDesc="Recent events title here"
          imageKeys={AdvertisementEvents.map((image) => image.imageKey)}
        />
        <AdvertisementSection
          title="RECENT ACTIVITIES"
          icon={<LucideSquareGantt size={30} />}
          titleDesc="Recent activities title here"
          imageKeys={AdvertisementActivities.map((image) => image.imageKey)}
        />
        <AdvertisementSection
          title="RECENT NEWS"
          icon={<LucideNewspaper size={30} />}
          titleDesc="Recent news title here"
          imageKeys={AdvertisementNews.map((image) => image.imageKey)}
        />
        <AdvertisementSection
          title="RECENT VIDEOS"
          icon={<LucideFilm size={30} />}
          titleDesc="Recent videos title here"
          imageKeys={AdvertisementVideos.map((image) => image.imageKey)}
        />
      </div>
    </WidthWrapper>
  );
};

export default Index;
