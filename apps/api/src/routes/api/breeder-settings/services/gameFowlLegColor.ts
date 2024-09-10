import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlLegColor from "@/models/dbGameFowlLegColor";
import { T_Game_Fowl_Leg_Color } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlLegColorById = async (req: Request, res: Response) => {
  const legColorId = req.params.legColorId;
  try {
    const legColor = await dbGameFowlLegColor.findById(legColorId);
    if (!legColor) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: legColor }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlLegColor = async (req: Request, res: Response) => {
  const { legColorTitle, legColorDetails }: T_Game_Fowl_Leg_Color = req.body;
  try {
    const newGameFowlLegColor = new dbGameFowlLegColor({
      legColorTitle,
      legColorDetails,
    });

    const savedGameFowlLegColor = await newGameFowlLegColor.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlLegColor: savedGameFowlLegColor._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlLegColor: [savedGameFowlLegColor._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlLegColor,
        message: "New game fowl leg color successfully saved!",
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

export const updateGameFowlLegColor = async (req: Request, res: Response) => {
  const legColorId = req.params.legColorId;
  const { legColorTitle, legColorDetails }: T_Game_Fowl_Leg_Color = req.body;
  try {
    const updatedLegColor = await dbGameFowlLegColor.findByIdAndUpdate(
      { _id: legColorId },
      {
        $set: {
          legColorTitle,
          legColorDetails,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedLegColor) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedLegColor,
        message: "Leg color successfully updated!",
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

export const deleteGameFowlLegColor = async (req: Request, res: Response) => {
  const legColorId = req.params.legColorId;
  try {
    const deletedLegColor =
      await dbGameFowlLegColor.findByIdAndDelete(legColorId);
    if (!deletedLegColor) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedLegColor,
        message: "Leg color successfully deleted!",
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
