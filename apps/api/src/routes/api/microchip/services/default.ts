import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService, T_UploadFileParams } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbMicrochip from "@/models/dbMicrochip";
import { T_Microchip } from "@repo/contract";
import { Request, Response } from "express";
import { Readable } from "stream";
import csv from "csv-parser";

const response = new ResponseService();
const fileService = new FileService();

export const getMicrochipIds = async (req: Request, res: Response) => {
  try {
    const microchipIds = await dbMicrochip.find();

    if (!microchipIds) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        items: microchipIds,
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const getMicrochipIdById = async (req: Request, res: Response) => {
  const mid = req.params.mid;
  try {
    const microchip = await dbMicrochip.findById(mid);
    if (!microchip) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: microchip,
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const uploadMicrochipCSV = async (req: Request, res: Response) => {
  try {
    const file = req.files?.file;
    if (!file) {
      return res.json(
        response.error({
          message: "No file uploaded!",
        })
      );
    }

    // This checking is optional in backend since this can be done in frontend
    const uploadedFile = Array.isArray(file) ? file[0] : file;
    if (uploadedFile?.mimetype !== "text/csv") {
      return res.json(
        response.error({
          message: "Unsupported file format!",
        })
      );
    }

    const uploadParams: T_UploadFileParams = {
      files: { file },
    };
    const uploadResult = await fileService.upload(uploadParams);
    const s3Key = uploadResult.key;

    const fileBuffer = await fileService.get({ key: s3Key });

    const microchipIds: string[] = [];
    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on("data", (row) => {
        microchipIds.push(row.microchipId);
      })
      .on("end", async () => {
        try {
          const microchipPromises = microchipIds.map((microchipId) =>
            new dbMicrochip({ microchipId }).save()
          );
          const savedMicrochips = await Promise.all(microchipPromises);

          res.json(
            response.success({
              items: savedMicrochips,
              message: "Microchip IDs successfully uploaded and saved!",
            })
          );
        } catch (err: any) {
          return res.json(
            response.error({
              message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
            })
          );
        }
      });
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addMicrochipIds = async (req: Request, res: Response) => {
  const { microchipId }: T_Microchip = req.body;
  try {
    const newMicrochipId = new dbMicrochip({
      microchipId,
    });
    const savedMicrochipId = await newMicrochipId.save();
    res.json(
      response.success({
        item: savedMicrochipId,
        message: "New microchip ID successfully saved!",
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const updateMicrochipId = async (req: Request, res: Response) => {
  const mid = req.params.mid;
  const { microchipId }: T_Microchip = req.body;
  try {
    const updatedMicrochipId = await dbMicrochip.findOneAndUpdate(
      {
        _id: mid,
        deletedAt: null,
      },
      {
        $set: {
          microchipId,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updateMicrochipId) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    res.json(
      response.success({
        item: updatedMicrochipId,
        message: "Microchip ID successfully updated!",
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};
