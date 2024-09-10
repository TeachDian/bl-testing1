import express from "express";
import {
  addMicrochipIds,
  getMicrochipIdById,
  getMicrochipIds,
  updateMicrochipId,
  uploadMicrochipCSV,
} from "./services/default";
import { updateMicrochipIdStatus } from "./services/status";

const router = express.Router();

// Microchip ID
router.get("/ids", getMicrochipIds);
router.get("/ids/:mid", getMicrochipIdById);
router.post("/upload-microchip-csv", uploadMicrochipCSV);
router.post("/ids", addMicrochipIds);
router.patch("/ids/:mid", updateMicrochipId);

// Status
router.patch("/status/:mid", updateMicrochipIdStatus);

export default router;
