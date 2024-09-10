"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import useSessionStore from "../store/useSessionStore";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSessionStore((state: any) => state);

  if (!session._id) {
    const redirect = pathname !== "/" ? `?redirect_to=${pathname}` : ``;
    router.push(`/login${redirect}`);
  }

  return <>{children}</>;
};

export default AuthGuard;
