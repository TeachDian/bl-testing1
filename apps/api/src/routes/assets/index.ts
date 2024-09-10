import isOriginValid from "@/common/middlewares/auth/isOriginValid";
import express from "express";
import { getAsset } from "./services/default";

const router = express.Router();

router.get('/:objKey', isOriginValid, getAsset)

export default router