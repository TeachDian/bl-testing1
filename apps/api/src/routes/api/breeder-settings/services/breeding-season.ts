import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbBreedingSeason from "@/models/dbBreedingSeason";
import { T_Breeding_Season, T_Update_Breeding_Season } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getBreedingSeasonById = async (req: Request, res: Response) => {
  const seasonId = req.params.seasonId;
  try {
    const breedingSeason = await dbBreedingSeason.findById(seasonId);
    if (!seasonId) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: breedingSeason }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addBreedingSeason = async (req: Request, res: Response) => {
  const { breedingSeasonTitle }: T_Breeding_Season = req.body;
  try {
    const newBreedingSeason = new dbBreedingSeason({
      breedingSeasonTitle,
    });

    const savedBreedingSeason = await newBreedingSeason.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { breedingSeason: savedBreedingSeason._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        breedingSeason: [savedBreedingSeason._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedBreedingSeason,
        message: "New breeding season successfully saved!",
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

export const updateBreedingSeason = async (req: Request, res: Response) => {
  const seasonId = req.params.seasonId;
  const { breedingSeasonTitle }: T_Update_Breeding_Season = req.body;
  try {
    const updatedTitle = await dbBreedingSeason.findByIdAndUpdate(
      { _id: seasonId },
      {
        $set: {
          breedingSeasonTitle,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedTitle,
        message: "Title successfully updated!",
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

export const deleteBreedingSeason = async (req: Request, res: Response) => {
  const seasonId = req.params.seasonId;
  try {
    const deletedTitle = await dbBreedingSeason.findByIdAndDelete(seasonId);
    if (!deletedTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedTitle,
        message: "Title successfully deleted!",
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
