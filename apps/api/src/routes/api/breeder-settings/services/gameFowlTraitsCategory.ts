import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlTraitsCategory from "@/models/dbGameFowlTraitsCategory";
import { T_Game_Fowl_Traits_Category } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlTraitsCategory = async (
  req: Request,
  res: Response
) => {
  const traitsCategoryId = req.params.traitsCategoryId;
  try {
    const traitsCategory =
      await dbGameFowlTraitsCategory.findById(traitsCategoryId);
    if (!traitsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: traitsCategory }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlTraitsCategory = async (
  req: Request,
  res: Response
) => {
  const { traitsCategory }: T_Game_Fowl_Traits_Category = req.body;
  try {
    const newGameFowlTraitsCategory = new dbGameFowlTraitsCategory({
      traitsCategory,
    });

    const savedGameFowlTraitsCategory = await newGameFowlTraitsCategory.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlTraitsCategory: savedGameFowlTraitsCategory._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlTraitsCategory: [savedGameFowlTraitsCategory._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlTraitsCategory,
        message: "New game fowl traits category successfully saved!",
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

export const updateGameFowlTraitsCategory = async (
  req: Request,
  res: Response
) => {
  const traitsCategoryId = req.params.traitsCategoryId;
  const { traitsCategory }: T_Game_Fowl_Traits_Category = req.body;
  try {
    const updatedTraitsCategory =
      await dbGameFowlTraitsCategory.findByIdAndUpdate(
        { _id: traitsCategoryId },
        {
          $set: {
            traitsCategory,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
    if (!updatedTraitsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedTraitsCategory,
        message: "Traits category successfully updated!",
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

export const deleteGameFowlTraitsCategory = async (
  req: Request,
  res: Response
) => {
  const traitsCategoryId = req.params.traitsCategoryId;
  try {
    const deletedTraitsCategory =
      await dbGameFowlTraitsCategory.findByIdAndDelete(traitsCategoryId);
    if (!deletedTraitsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedTraitsCategory,
        message: "Traits category successfully deleted!",
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
