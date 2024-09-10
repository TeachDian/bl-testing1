"use client";
import useSessionStore from "../store/useSessionStore";
import { T_Session } from "@repo/contract";
import useGetSessionUser from "../hooks/useGetSessionUser";
import { Spinner } from "./ui/Spinner";

const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetSessionUser();
  const updateSession = useSessionStore((state) => state.update);
  const removeSession = useSessionStore((state) => state.remove);

  if (isLoading) {
    return <Spinner variant="primary" middle />;
  }

  if (data && !data.error && data.item && !isLoading) {
    updateSession(data?.item as T_Session);
  } else if (data?.error && !isLoading) {
    removeSession();
  }

  return <>{children}</>;
};

export default AuthStateProvider;
