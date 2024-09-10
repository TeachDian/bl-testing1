import { NextFunction, Request, Response } from "express";
import { ResponseService } from "@/common/services/response";
import {
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from "@/common/constants";
import { CSRF, SESSION } from "@repo/constants";
import { EncryptionService } from "@repo/services";
import redisClient from "@/common/utils/redisClient";

const response = new ResponseService();
const csrfEncryption = new EncryptionService("csrf");

const isCsrfTokenValid2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionCookie = req.cookies[SESSION];
  const csrfCookie = req.cookies[CSRF];
  if (csrfCookie && sessionCookie) {
    try {
      const session = await redisClient.hGetAll(
        `${sessionCookie}:${csrfCookie}`,
      );
      const decryptedCsrf = csrfEncryption.decrypt(csrfCookie) as {
        sessionKey: string;
        userId: number;
      };
      if (
        decryptedCsrf.sessionKey === sessionCookie &&
        decryptedCsrf.userId === Number(session?.userId)
      ) {
        next();
      } else {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          }),
        );
      }
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

export default isCsrfTokenValid2;
