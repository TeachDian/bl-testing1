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
  LucideCalendarCheck2,
  LucideCpu,
  LucideGlobe,
  LucideMegaphone,
  LucideMenu,
  LucideStore,
  LucideUser,
  Tractor,
  UserCog,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./shadcn/ui/button";

interface SideBarProps {
  className?: string;
  children?: React.ReactNode;
}

const microchipContent = [
  {
    title: "Add",
    link: "/admin/microchip",
  },
  {
    title: "View",
    link: "/admin/microchip/view",
  },
];

const staffContent = [
  {
    title: "Add",
    link: "/admin/staff",
  },
  {
    title: "View",
    link: "/admin/staff/view",
  },
];

const subscriptionContent = [
  {
    title: "Active",
    link: "/admin/subscription/active",
  },
  {
    title: "For Renewal",
    link: "/admin/subscription/for-renewal",
  },
  {
    title: "Cancelled",
    link: "/admin/subscription/cancelled",
  },
  {
    title: "Expired",
    link: "/admin/subscription/expired",
  },
];

const farmbreedersContent = [
  // {
  //   icon: <LucideCpu size={20} />,
  //   title: "Microchip",
  //   link: "/admin/microchip",
  // },
  // {
  //   icon: <LucideUser size={20} />,
  //   title: "Staff",
  //   link: "/admin/staff",
  // },
  // {
  //   icon: <LucideCalendarCheck2 size={20} />,
  //   title: "Subscription",
  //   link: "/admin/subscription",
  // },
  {
    icon: <Tractor size={20} />,
    title: "Farm Breeders",
    link: "/admin/farmbreeders",
  },
];

const dropDownWebContents = [
  {
    title: "About Us",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/about-us",
  },
  {
    title: "Advertisements",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/advertisements",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/advertisements/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/advertisements/view",
      },
    ],
  },
  {
    title: "Activities",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/activities",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/activities/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/activities/view",
      },
    ],
  },
  {
    title: "Events",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/events",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/events/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/events/view",
      },
    ],
  },
  {
    title: "News",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/news",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/news/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/news/view",
      },
    ],
  },
  {
    title: "Slider",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/slider",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/sliders/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/sliders/view",
      },
    ],
  },
  {
    title: "Social Media Links",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/social-media-links",
    subItems: [
      {
        title: "Update",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/social-media-links",
      },
    ],
  },
  {
    title: "Videos",
    link: "/admin/web-contents/666839086f2250f4d1cefb84/videos",
    subItems: [
      {
        title: "Add",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/videos/add",
      },
      {
        title: "View",
        link: "/admin/web-contents/666839086f2250f4d1cefb84/videos/view",
      },
    ],
  },
];

const breedersettingsContent = [
  {
    title: "Breeding Category",
    link: "/admin/settings/breeding-season",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/breeding-season/add",
      },
      {
        title: "View",
        link: "/admin/settings/breeding-season/view",
      },
    ],
  },
  {
    title: "Federation",
    link: "/admin/settings/federation",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/federation/add",
      },
      {
        title: "View",
        link: "/admin/settings/federation/view",
      },
    ],
  },
  {
    title: "Game Fowl Class",
    link: "/admin/settings/gf-class",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-class/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-class/view",
      },
    ],
  },
  {
    title: "Game Fowl Comb",
    link: "/admin/settings/gf-comb",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-comb/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-comb/view",
      },
    ],
  },
  {
    title: "Game Fowl Feather Color",
    link: "/admin/settings/gf-body-color",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-body-color/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-body-color/view",
      },
    ],
  },
  {
    title: "Game Fowl Gender",
    link: "/admin/settings/gf-gender",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-gender/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-gender/view",
      },
    ],
  },
  {
    title: "Game Fowl Leg Color",
    link: "/admin/settings/gf-leg-color",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-leg-color/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-leg-color/view",
      },
    ],
  },
  // {
  //   title: "Game Fowl Skills Category",
  //   link: "/admin/settings/gf-skills-category",
  //   subItems: [
  //     {
  //       title: "Add",
  //       link: "/admin/settings/gf-skills-category/add",
  //     },
  //     {
  //       title: "View",
  //       link: "/admin/settings/gf-skills-category/view",
  //     },
  //   ],
  // },
  {
    title: "Game Fowl Skills",
    link: "/admin/settings/gf-skills",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-skills/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-skills/view",
      },
    ],
  },
  {
    title: "Game Fowl Status",
    link: "/admin/settings/gf-status",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-status/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-status/view",
      },
    ],
  },
  {
    title: "Game Fowl Traits Category",
    link: "/admin/settings/gf-traits-category",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-traits-category/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-traits-category/view",
      },
    ],
  },
  {
    title: "Game Fowl Traits",
    link: "/admin/settings/gf-traits",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-traits/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-traits/view",
      },
    ],
  },
  {
    title: "Game Fowl Type",
    link: "/admin/settings/gf-type",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/gf-type/add",
      },
      {
        title: "View",
        link: "/admin/settings/gf-type/view",
      },
    ],
  },
  {
    title: "Local Association",
    link: "/admin/settings/local-association",
    subItems: [
      {
        title: "Add",
        link: "/admin/settings/local-association/add",
      },
      {
        title: "View",
        link: "/admin/settings/local-association/view",
      },
    ],
  },
];

const marketplaceContent = [
  {
    title: "Market Place Category",
    link: "/admin/marketplace/local-association",
    subItems: [
      {
        title: "Add",
        link: "/admin/marketplace/local-association/add",
      },
      {
        title: "View",
        link: "/admin/marketplace/local-association/view",
      },
    ],
  },
  {
    title: "Product Category",
    link: "/admin/marketplace/local-association",
    subItems: [
      {
        title: "Add",
        link: "/admin/marketplace/local-association/add",
      },
      {
        title: "View",
        link: "/admin/marketplace/local-association/view",
      },
    ],
  },
];

const advertiserContent = [
  {
    title: "Add",
    link: "/admin/advertiser",
  },
  {
    title: "Active",
    link: "/admin/advertiser/active",
  },
  {
    title: "Pending",
    link: "/admin/advertiser/pending",
  },
  {
    title: "Inactive",
    link: "/admin/advertiser/inactive",
  },
  {
    title: "Denied",
    link: "/admin/advertiser/denied",
  },
  {
    title: "Ads",
    link: "/admin/advertiser/ads",
  },
];

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
                      Dashboard
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

                  <>
                    {!isSidebarOpen ? (
                      <div className="flex flex-col space-y-2 mt-2 opacity-50 ">
                        <LucideCpu
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <LucideUser
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <LucideCalendarCheck2
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
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
                          <AccordionItem value="microchip">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideCpu size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Microchip
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {microchipContent.map((item, index) => (
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

                          <AccordionItem value="staff">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideUser size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Staff
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {staffContent.map((item, index) => (
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

                          <AccordionItem value="subscription">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideCalendarCheck2 size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Subscription
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {subscriptionContent.map((item, index) => (
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

                    {farmbreedersContent.map((item, index) => (
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
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <UserCog
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <LucideStore
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <LucideMegaphone
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
                        />
                        <LucideCalendarCheck2
                          size={20}
                          className="mx-auto text-gray-200 hover:cursor-pointer"
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
                          <AccordionItem value="web-contents">
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
                                  {item.subItems ? (
                                    <Accordion type="single" collapsible>
                                      <AccordionItem value={item.title}>
                                        <AccordionTrigger
                                          className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                        >
                                          <Typography
                                            className={`${tabClassNames} text-md ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionTrigger>
                                        <AccordionContent className="ml-4">
                                          {item.subItems.map(
                                            (subItem, subIndex) => (
                                              <Link
                                                href={subItem.link}
                                                key={subIndex}
                                              >
                                                <Typography
                                                  className={`${tabClassNames} text-sm ${
                                                    isActive(subItem.link)
                                                      ? "bg-gray-400 text-white rounded-md"
                                                      : ""
                                                  } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                                >
                                                  {subItem.title}
                                                </Typography>
                                              </Link>
                                            )
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  ) : (
                                    <Link href={item.link}>
                                      <Typography
                                        className={`${tabClassNames} text-md ml-2 ${
                                          isActive(item.link)
                                            ? "bg-gray-400 text-white rounded-md"
                                            : ""
                                        } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                      >
                                        {item.title}
                                      </Typography>
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="settings">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <UserCog size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Breeder Settings
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {breedersettingsContent.map((item, index) => (
                                <div key={index}>
                                  {item.subItems ? (
                                    <Accordion type="single" collapsible>
                                      <AccordionItem value={item.title}>
                                        <AccordionTrigger
                                          className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                        >
                                          <Typography
                                            className={`${tabClassNames} text-md ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionTrigger>
                                        <AccordionContent className="ml-4">
                                          {item.subItems.map(
                                            (subItem, subIndex) => (
                                              <Link
                                                href={subItem.link}
                                                key={subIndex}
                                              >
                                                <Typography
                                                  className={`${tabClassNames} text-sm ${
                                                    isActive(subItem.link)
                                                      ? "bg-gray-400 text-white rounded-md"
                                                      : ""
                                                  } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                                >
                                                  {subItem.title}
                                                </Typography>
                                              </Link>
                                            )
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
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
                          <AccordionItem value="market-place">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideStore size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Market Place
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {marketplaceContent.map((item, index) => (
                                <div key={index}>
                                  {item.subItems ? (
                                    <Accordion type="single" collapsible>
                                      <AccordionItem value={item.title}>
                                        <AccordionTrigger
                                          className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                        >
                                          <Typography
                                            className={`${tabClassNames} text-md ${
                                              isActive(item.link)
                                                ? "bg-gray-400 text-white rounded-md"
                                                : ""
                                            } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                          >
                                            {item.title}
                                          </Typography>
                                        </AccordionTrigger>
                                        <AccordionContent className="ml-4">
                                          {item.subItems.map(
                                            (subItem, subIndex) => (
                                              <Link
                                                href={subItem.link}
                                                key={subIndex}
                                              >
                                                <Typography
                                                  className={`${tabClassNames} text-sm ${
                                                    isActive(subItem.link)
                                                      ? "bg-gray-400 text-white rounded-md"
                                                      : ""
                                                  } ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                                                >
                                                  {subItem.title}
                                                </Typography>
                                              </Link>
                                            )
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
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
                          <AccordionItem value="advertiser">
                            <AccordionTrigger
                              className={`${tabClassNames} ${!isSidebarOpen ? "pointer-events-none opacity-50" : ""}`}
                            >
                              <div className="flex gap-2 items-center">
                                <div>
                                  <LucideMegaphone size={20} />
                                </div>
                                <div>
                                  <Typography
                                    variant="h4"
                                    fontWeight="semiBold"
                                    className={`${!isSidebarOpen ? "hidden" : ""}`}
                                  >
                                    Advertisers
                                  </Typography>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                              {advertiserContent.map((item, index) => (
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
