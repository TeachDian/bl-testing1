import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlSkills from "@/models/dbGameFowlSkills";
import dbGameFowlTraits from "@/models/dbGameFowlTraits";
import dbGameFowlTraitsCategory from "@/models/dbGameFowlTraitsCategory";
import dbGameFowlType from "@/models/dbGameFowlType";
import { T_Game_Fowl_Traits } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlTraitsById = async (req: Request, res: Response) => {
  const traitsId = req.params.traitsId;
  try {
    const traits = await dbGameFowlTraits
      .findById(traitsId)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlTraitsCategory");
    if (!traits) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: traits }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlTraits = async (req: Request, res: Response) => {
  const {
    gameFowlType,
    gameFowlTraitsCategory,
    gameFowlTraitsSet,
  }: T_Game_Fowl_Traits = req.body;
  try {
    const existingType = await dbGameFowlType.findById(gameFowlType);
    const existingTraitsCategory = await dbGameFowlTraitsCategory.findById(
      gameFowlTraitsCategory
    );
    if (!existingType || !existingTraitsCategory) {
      return res.json(
        response.error({
          message: "Invalid GameFowlType or GameFowlTraitsCategory ID provided",
        })
      );
    }

    const newGameFowlTraits = new dbGameFowlTraits({
      gameFowlType,
      gameFowlTraitsCategory,
      gameFowlTraitsSet: JSON.stringify(gameFowlTraitsSet),
    });

    const savedGameFowlTraits = await newGameFowlTraits.save();

    const populatedGameFowlTraits = await dbGameFowlTraits
      .findById(savedGameFowlTraits._id)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlTraitsCategory");

    if (!populatedGameFowlTraits) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlType and GameFowlTraitsCategory",
        })
      );
    }

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlTraits: populatedGameFowlTraits._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlTraits: [populatedGameFowlTraits._id],
      }).save();
    }

    res.json(
      response.success({
        item: populatedGameFowlTraits,
        message: "New game fowl traits successfully saved!",
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

export const updateGameFowlTraits = async (req: Request, res: Response) => {
  const traitsId = req.params.traitsId;
  const {
    gameFowlType,
    gameFowlTraitsCategory,
    gameFowlTraitsSet,
  }: T_Game_Fowl_Traits = req.body;
  try {
    const updatedTraits = await dbGameFowlTraits.findByIdAndUpdate(
      traitsId,
      {
        $set: {
          gameFowlType,
          gameFowlTraitsCategory,
          gameFowlTraitsSet: JSON.stringify(gameFowlTraitsSet),
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedTraits) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    const populatedTraits = await dbGameFowlTraits
      .findById(updatedTraits._id)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlTraitsCategory");

    if (!updatedTraits) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlTraits",
        })
      );
    }

    res.json(
      response.success({
        item: populatedTraits,
        message: "Traits successfully updated!",
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : "UNKNOWN_ERROR_OCCURRED",
      })
    );
  }
};

export const deleteGameFowlTraits = async (req: Request, res: Response) => {
  const traitsId = req.params.traitsId;
  try {
    const deletedTraits = await dbGameFowlTraits
      .findById(traitsId)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlTraitsCategory");

    if (!deletedTraits) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlTraits.findByIdAndDelete(traitsId);

    res.json(
      response.success({
        item: deletedTraits,
        message: "Traits successfully deleted!",
      })
    );
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : "UNKNOWN_ERROR_OCCURRED",
      })
    );
  }
};
