"use client";
import { Button } from "@/common/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/shadcn/ui/card";
import { Input } from "@/common/components/shadcn/ui/input";
import { Label } from "@/common/components/shadcn/ui/label";
import { useForm } from "react-hook-form";

import useLogin from "./hooks/useLogin";
import { IUserLogin } from "@/common/types";
import Link from "next/link";

const Login = () => {
  const { register, handleSubmit, watch } = useForm<IUserLogin>();
  const { mutate } = useLogin();
  const onSubmit = async (data: IUserLogin) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      action="#"
      method="POST"
    >
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input {...register("password")} type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};
export default Login;
