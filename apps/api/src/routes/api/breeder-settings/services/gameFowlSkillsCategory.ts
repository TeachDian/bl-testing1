import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlSkillsCategory from "@/models/dbGameFowlSkillsCategory";
import { T_Game_Fowl_Skills_Category } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlSkillsCategoryById = async (
  req: Request,
  res: Response
) => {
  const skillsCategoryId = req.params.skillsCategoryId;
  try {
    const skillsCategory =
      await dbGameFowlSkillsCategory.findById(skillsCategoryId);
    if (!skillsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: skillsCategory }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlSkillsCategory = async (
  req: Request,
  res: Response
) => {
  const { skillsCategory }: T_Game_Fowl_Skills_Category = req.body;
  try {
    const newGameFowlSkillsCategory = new dbGameFowlSkillsCategory({
      skillsCategory,
    });

    const savedGameFowlSkillsCategory = await newGameFowlSkillsCategory.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlSkillsCategory: savedGameFowlSkillsCategory._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlSkillsCategory: [savedGameFowlSkillsCategory._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlSkillsCategory,
        message: "New game fowl skills category successfully saved!",
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

export const updateGameFowlSkillsCategory = async (
  req: Request,
  res: Response
) => {
  const skillsCategoryId = req.params.skillsCategoryId;
  const { skillsCategory }: T_Game_Fowl_Skills_Category = req.body;
  try {
    const updatedSkillsCategory =
      await dbGameFowlSkillsCategory.findByIdAndUpdate(
        { _id: skillsCategoryId },
        {
          $set: {
            skillsCategory,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
    if (!updatedSkillsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedSkillsCategory,
        message: "Skills category successfully updated!",
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

export const deleteGameFowlSkillsCategory = async (
  req: Request,
  res: Response
) => {
  const skillsCategoryId = req.params.skillsCategoryId;
  try {
    const deletedSkillsCategory =
      await dbGameFowlSkillsCategory.findByIdAndDelete(skillsCategoryId);
    if (!deletedSkillsCategory) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedSkillsCategory,
        message: "Skills category successfully deleted!",
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
