import { NextFunction, Request, Response } from "express";
import { ResponseService } from "@/common/services/response";
import { E_RegistrationType, E_UserRole, T_Session } from "@repo/contract";
import {
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from "@/common/constants";
import { SESSION, CSRF } from "@repo/constants";
import redisClient from "@/common/utils/redisClient";
import User from "@/models/user";

const response = new ResponseService();

const isUserLoggedIn2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionCookie = req.cookies[SESSION];
  const csrfCookie = req.cookies[CSRF];
  if (sessionCookie) {
    try {
      const session = await redisClient.hGetAll(
        `${sessionCookie}:${csrfCookie}`,
      );
      const user = await User.findOne({
        _id: session._id,
        deletedAt: { $exists: false },
      });
      const authUser: T_Session = {
        _id: user?._id as unknown as string,
        registrationType: user?.registrationType as E_RegistrationType,
        email: user?.email as string,
        role: user?.role as E_UserRole,
      };
      res.locals.user = authUser;
      next();
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED;
      response.error({
        message: message,
      });
    }
  } else {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      }),
    );
  }
};

export default isUserLoggedIn2;
