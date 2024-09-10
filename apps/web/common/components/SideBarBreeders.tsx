"use client";
import Link from "next/link";
import { WidthWrapper } from "./WidthWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/ui/accordion";
import { Typography } from "./ui/Typography";
import { cn } from "../utils";
import {
  LucideBookOpenText,
  LucideContainer,
  LucideGauge,
  LucideGlobe,
  LucideLineChart,
  LucideMegaphone,
  LucideMenu,
  LucidePodcast,
  LucideSend,
  LucideSignpost,
  LucideStore,
  LucideWrench,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const dropDownBreederInformation = [
  {
    title: "Breeder profile",
    link: "/breeders/breeder-information/breeder-profile",
  },
  {
    title: "Breeder farm details",
    link: "/breeders/breeder-information/breeder-farm-details",
  },
];
const dropDownGameFowlMaterials = [
  {
    title: "Add",
    link: "/breeders/game-fowl-materials/add",
  },
  {
    title: "Male game fowls",
    link: "/breeders/game-fowl-materials/male-game-fowls",
  },
  {
    title: "Female game fowls",
    link: "/breeders/game-fowl-materials/female-game-fowls",
  },
];
const dropDownBreedingPens = [
  {
    title: "Breed",
    link: "/breeders/breeding-pens/breed",
  },
  {
    title: "View",
    link: "/breeders/breeding-pens/view",
  },
];
const dropDownBreedingGuide = [
  {
    title: "Feather Colors",
    link: "/breeders/breeding-guide/feather-colors",
  },
  {
    title: "Breeding Types",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Game Fowl Skills",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Game Fowl Statuses",
    link: "/breeders/breeding-guide/game-fowl-statuses",
  },
  {
    title: "Game Fowl Traits",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Game Fowl Types",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Leg Colors",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Markings",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
];
const dropDownWebContents = [
  {
    title: "Activities",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/advertisements",
  },
  {
    title: "Events",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "News",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
  {
    title: "Videos",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
  },
];
interface SideBarProps {
  className?: string;
  children?: React.ReactNode;
}
const sideBarContent = [
  {
    icon: <LucideLineChart size={20} />,
    title: "Game Fowl Status",
    link: "/admin/subscription",
  },
  {
    icon: <LucideStore size={20} />,
    title: "Marketplace",
    link: "/admin/marketplace",
  },
  {
    icon: <LucideSend size={20} />,
    title: "Message",
    link: "/admin/advertiser",
  },
];
const sideBarContentSecond = [
  {
    icon: <LucidePodcast size={20} />,
    title: "Subscription",
    link: "/admin/advertiser",
  },
  {
    icon: <LucideMegaphone size={20} />,
    title: "Advertisements",
    link: "/admin/advertiser",
  },
];
const dashboard = [{
  title: "Dashboard",
  icon: <LucideGauge size={20} />,
  link: "/",
}];

const tabClassNames = cn(
  "flex items-center gap-2 p-2 px-2 font-semibold tracking-tight text-white",
  "hover:bg-gray-400 hover:text-white hover:rounded-md transition ease-in-out"
);

const SideBarAdmin = ({ children, className }: SideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (link: string) => pathname === link;

  useEffect(() => {
    const pathArray = pathname.split("/");
    if (pathArray.includes("web-contents")) {
      setOpenAccordion("web-contents");
    } else if (pathArray.includes("settings")) {
      setOpenAccordion("settings");
    } else {
      setOpenAccordion(undefined);
    }
  }, [pathname]);

  return (
    <div className="">
      <WidthWrapper className="mb-40" width="full">
        <div className="sm:grid grid-cols-12 w-full">
          <div
            className={`${
              isSidebarOpen ? "relative col-span-3" : "relative col-span-1"
            }`}
          >
            <div className={cn(className)}>
              <div className=" w-full ">
                <div
                  className={`border pt-32 rounded-lg p-4 fixed shadow-lg transition-all bg-gradient-secondary h-full ${
                    isSidebarOpen
                      ? "w-80 sm:max-h-[calc(100vh)] overflow-y-auto"
                      : "w-16"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="h2"
                      className={`text-white p-2 px-2 font-semibold tracking-tight cursor-pointer ${
                        !isSidebarOpen ? "hidden" : ""
                      }`}
                      onClick={toggleSidebar}
                    >
                      Home
                    </Typography>
                    <div
                      className={`text-white hover:cursor-pointer hover:text-gray-300 transition ease-in-out ${
                        !isSidebarOpen ? "mx-auto pl-1 mb-6" : ""
                      }`}
                      onClick={toggleSidebar}
                    >
                      <LucideMenu size={25} />
                    </div>
                  </div>
                  <div>
                  {dashboard.map((item, index) => (
                      <Link href={item.link} key={index}>
                        <div
                          className={`${tabClassNames} ${
                            isActive(item.link)
                              ? "bg-gray-400 text-white rounded-md"
                              : ""
                          } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                        >
                          <div>{item.icon}</div>
                          <div>
                            <Typography
                              variant="h4"
                              fontWeight="semiBold"
                              className={`${!isSidebarOpen ? "hidden" : ""}`}
                            >
                              {item.title}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <>
                    {!isSidebarOpen ? (
                      <div className="flex flex-col space-y-2 mt-2 opacity-50 ">
                        <LucideBookOpenText
                          size={20}
                          className="mx-auto ml-2 text-gray-200 hover:cursor-pointer"
                        />
                        <LucideWrench
                          size={20}
                          className="mx-auto ml-2 text-gray-200 hover:cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="">
                        <Accordion
                          type="single"
                          collapsible
                          value={openAccordion}
                          onValueChange={setOpenAccordion}
                        >
                          <AccordionItem value="Account Information">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideBookOpenText size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Account Information
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {dropDownBreederInformation.map((item, index) => (
                                <div key={index}>
                                  {item.title ? (
                                    <Accordion type="single" collapsible>
                                      <Link href={item.link}>
                                        <AccordionItem value={item.title}>
                                          <Typography
                                            className={`${tabClassNames} text-md hover:cursor-pointer ml-2 ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionItem>
                                      </Link>
                                    </Accordion>
                                  ) : (
                                    <Typography
                                      className={`${tabClassNames} text-md ml-2 ${
                                        isActive(item.link)
                                          ? "bg-gray-400 text-white rounded-md"
                                          : ""
                                      } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                      {item.title}
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="Game Fowl Materials">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideWrench size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Game Fowl Materials
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {dropDownGameFowlMaterials.map((item, index) => (
                                <div key={index}>
                                  {item.title ? (
                                    <Accordion type="single" collapsible>
                                      <Link href={item.link}>
                                        <AccordionItem value={item.title}>
                                          <Typography
                                            className={`${tabClassNames} text-md hover:cursor-pointer ml-2 ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionItem>
                                      </Link>
                                    </Accordion>
                                  ) : (
                                    <Typography
                                      className={`${tabClassNames} text-md ml-2 ${
                                        isActive(item.link)
                                          ? "bg-gray-400 text-white rounded-md"
                                          : ""
                                      } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                      {item.title}
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="Breeding Pens">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideContainer size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Breeding Pens
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {dropDownBreedingPens.map((item, index) => (
                                <div key={index}>
                                  {item.title ? (
                                    <Accordion type="single" collapsible>
                                      <Link href={item.link}>
                                        <AccordionItem value={item.title}>
                                          <Typography
                                            className={`${tabClassNames} text-md hover:cursor-pointer ml-2 ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionItem>
                                      </Link>
                                    </Accordion>
                                  ) : (
                                    <Typography
                                      className={`${tabClassNames} text-md ml-2 ${
                                        isActive(item.link)
                                          ? "bg-gray-400 text-white rounded-md"
                                          : ""
                                      } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                      {item.title}
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="Breeding Guide">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideSignpost size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Breeding Guide
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {dropDownBreedingGuide.map((item, index) => (
                                <div key={index}>
                                  {item.title ? (
                                    <Accordion type="single" collapsible>
                                      <Link href={item.link}>
                                        <AccordionItem value={item.title}>
                                          <Typography
                                            className={`${tabClassNames} text-md hover:cursor-pointer ml-2 ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionItem>
                                      </Link>
                                    </Accordion>
                                  ) : (
                                    <Typography
                                      className={`${tabClassNames} text-md ml-2 ${
                                        isActive(item.link)
                                          ? "bg-gray-400 text-white rounded-md"
                                          : ""
                                      } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                      {item.title}
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}

                    {sideBarContent.map((item, index) => (
                      <Link href={item.link} key={index}>
                        <div
                          className={`${tabClassNames} ${
                            isActive(item.link)
                              ? "bg-gray-400 text-white rounded-md"
                              : ""
                          } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                        >
                          <div>{item.icon}</div>
                          <div>
                            <Typography
                              variant="h4"
                              fontWeight="semiBold"
                              className={`${!isSidebarOpen ? "hidden" : ""}`}
                            >
                              {item.title}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {!isSidebarOpen ? (
                      <div className="flex flex-col space-y-2 mt-2 opacity-50 ">
                        <LucideGlobe
                          size={20}
                          className="mx-auto ml-2 text-gray-200 hover:cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="">
                        <Accordion
                          type="single"
                          collapsible
                          value={openAccordion}
                          onValueChange={setOpenAccordion}
                        >
                          <AccordionItem value="Web Contents">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideGlobe size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Web Contents
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {dropDownWebContents.map((item, index) => (
                                <div key={index}>
                                  {item.title ? (
                                    <Accordion type="single" collapsible>
                                      <Link href={item.link}>
                                        <AccordionItem value={item.title}>
                                          <Typography
                                            className={`${tabClassNames} text-md hover:cursor-pointer ml-2 ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionItem>
                                      </Link>
                                    </Accordion>
                                  ) : (
                                    <Typography
                                      className={`${tabClassNames} text-md ml-2 ${
                                        isActive(item.link)
                                          ? "bg-gray-400 text-white rounded-md"
                                          : ""
                                      } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                    >
                                      {item.title}
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                    {sideBarContentSecond.map((item, index) => (
                      <Link href={item.link} key={index}>
                        <div
                          className={`${tabClassNames} ${
                            isActive(item.link)
                              ? "bg-gray-400 text-white rounded-md"
                              : ""
                          } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                        >
                          <div>{item.icon}</div>
                          <div>
                            <Typography
                              variant="h4"
                              fontWeight="semiBold"
                              className={`${!isSidebarOpen ? "hidden" : ""}`}
                            >
                              {item.title}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-9 pt-32 pr-4">{children}</div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default SideBarAdmin;
