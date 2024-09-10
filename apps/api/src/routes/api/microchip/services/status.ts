import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbMicrochip from "@/models/dbMicrochip";
import { T_Update_Microchip_Status } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const updateMicrochipIdStatus = async (req: Request, res: Response) => {
  const mid = req.params.mid;
  const { microchipStatus }: T_Update_Microchip_Status = req.body;
  try {
    const updatedMicrochipIdStatus = await dbMicrochip.findOneAndUpdate(
      {
        _id: mid,
        deletedAt: null,
      },
      {
        $set: {
          microchipStatus,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updateMicrochipIdStatus) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    res.json(
      response.success({
        item: updatedMicrochipIdStatus,
        message: "Microchip ID status successfully updated!",
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
