import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederModule from "@/models/dbBreederModule";
import { Request, Response } from "express";

const response = new ResponseService();

export const getBreederModule = async (req: Request, res: Response) => {
  try {
    const breederModule = await dbBreederModule
      .find({ deletedAt: null })
      .populate("gameFowlMaterials")
      .populate({
        path: "breedingPens",
        populate: [
          {
            path: "breedingSeason",
          },
          {
            path: "forBreeding.broodCock",
          },
          {
            path: "forBreeding.broodHen",
          },
        ],
      });

    const filteredBreederModule = breederModule.reverse();

    res.json(
      response.success({
        items: filteredBreederModule,
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