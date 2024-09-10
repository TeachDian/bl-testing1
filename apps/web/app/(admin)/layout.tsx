import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryClientWrapper from "@/common/components/QueryClientWrapper";
import HeaderAdminPage from "@/common/components/HeaderAdminPage";
import SideBarAdmin from "@/common/components/SideBarAdmin";
import FooterUserPage from "@/common/components/FooterUserPage";

import { Toaster } from "react-hot-toast";

import { TAB_LOGO } from "@/common/constants/index";
import { ADMIN } from "@/common/constants/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `GFBIMS - ${ADMIN}`,
  description: `Generated by Breeder's Link`,
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href={TAB_LOGO} />
      <body className={inter.className}>
        <QueryClientWrapper>
          <HeaderAdminPage />
          <Toaster />
          <SideBarAdmin>{children}</SideBarAdmin>
          <FooterUserPage />
        </QueryClientWrapper>
      </body>
    </html>
  );
}
