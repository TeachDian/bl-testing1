"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/shadcn/ui/dropdown-menu";
import { Typography } from "@/common/components/ui/Typography";
import { LucideMenu, LucideSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useParams } from "next/navigation";
import useGetWebContentsById from "../hooks/Web-Contents/useGetWebContentsById";
import router, { useRouter } from "next/router";

const TopItem = [
  {
    title: "Download",
    links: [
      { label: "App Store", url: "https://example.com/app-store" },
      { label: "Google Play", url: "https://example.com/google-play" },
    ],
  },
  {
    title: "Create Account",
    links: [
      { label: "Sign Up", url: "https://example.com/signup" },
      { label: "Join Now", url: "https://example.com/join" },
    ],
  },
  {
    title: "Login",
    links: [
      { label: "Login Now", url: "https://example.com/login" },
      { label: "Sign In", url: "https://example.com/signin" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Facebook", url: "https://facebook.com/example" },
      { label: "Twitter", url: "https://twitter.com/example" },
      { label: "Instagram", url: "https://instagram.com/example" },
    ],
  },
];

const HeaderUserPage = () => {


  const BottomItem = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/aboutUs",
    },
    {
      title: "Events",
      link: "/events",
    },
    {
      title: "Activities",
      link: `/activities`,
    },
    {
      title: "News",
      link: "/news",
    },
    {
      title: "Videos",
      link: "/videos",
    },
    {
      title: "Market Place",
      link: "/marketplace",
    },
    {
      title: "Advertisers",
      link: "/",
    },
    {
      title: "Farms",
      link: "/",
    },
    {
      title: "Subscription",
      link: "/",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-[100px] bg-gradient-secondary text-white py-4 pr-4 pl-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex w-full md:w-1/2 items-center justify-between ">
        <div className="flex gap-4 ">
          <div className="flex items-center">
            <Image
              src="/rooster.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>

          <div className="flex">
            <div className="flex-none">
              <Typography variant="h1" fontWeight="semiBold">
                BREEDER'S LINK
              </Typography>
              <Typography
                variant="h4"
                fontWeight="semiBold"
                className="flex-none"
              >
                Make it simple!
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex justify-start md:hidden relative">
          <div className="flex items-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <LucideMenu size={30} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 absolute"
                style={{ marginTop: "32px", marginLeft: "12px", right: 270 }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white border text-gray-700 border-gray-300 py-1 px-2 focus:outline-none rounded-sm w-full"
                />

                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem style={{ paddingLeft: 8 }}>
                  <div className="flex flex-col space-y-2 justify-start text-gray-600">
                    {BottomItem.map((item) => (
                      <Typography key={item.title}>{item.title}</Typography>
                    ))}
                    {TopItem.map((item) => (
                      <Typography key={item.title}>{item.title}</Typography>
                    ))}
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="hidden w-full md:w-1/2 md:flex items-center justify-end">
        <div className="relative">
          <div className="flex gap-2 justify-end mb-2">
            {TopItem.map((items) => (
              <div
                key={items.title}
                className="flex items-center hover:cursor-pointer"
              >
                <Typography className="text-sm">{items.title}</Typography>
              </div>
            ))}

            <SocialIcon
              url="www.facebook.com"
              style={{ width: "20px", height: "20px" }}
            />
            <SocialIcon
              url="www.instagram.com"
              style={{ width: "20px", height: "20px" }}
            />
            <SocialIcon
              url="www.x.com"
              style={{ width: "20px", height: "20px" }}
            />
          </div>

          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white border text-gray-700 border-gray-300 py-1 px-4 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-gray-400 text-white font-bold py-1 px-2 ">
              <LucideSearch />
            </button>
          </div>

          <div className="flex gap-2 justify-end mt-2">
            {BottomItem.map((items) => (
              <div
                key={items.title}
                className="flex items-center hover:cursor-pointer"
              >
                <Link href={items.link} passHref={true}>
                  <Typography className="text-sm">{items.title}</Typography>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUserPage;
