import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlSkills from "@/models/dbGameFowlSkills";
import dbGameFowlSkillsCategory from "@/models/dbGameFowlSkillsCategory";
import dbGameFowlType from "@/models/dbGameFowlType";
import { T_Game_Fowl_Skills, T_Game_Fowl_Type } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlSkillsById = async (req: Request, res: Response) => {
  const skillsId = req.params.skillsId;
  try {
    const skills = await dbGameFowlSkills
      .findById(skillsId)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlSkillsCategory");
    if (!skills) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: skills }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlSkills = async (req: Request, res: Response) => {
  const {
    gameFowlType,
    gameFowlSkillsCategory,
    gameFowlSkillSet,
  }: T_Game_Fowl_Skills = req.body;
  try {
    const existingType = await dbGameFowlType.findById(gameFowlType);
    const existingSkillsCategory = await dbGameFowlSkillsCategory.findById(
      gameFowlSkillsCategory
    );
    if (!existingType || !existingSkillsCategory) {
      return res.json(
        response.error({
          message: "Invalid GameFowlType or GameFowlSkillsCategory ID provided",
        })
      );
    }

    const newGameFowlSkills = new dbGameFowlSkills({
      gameFowlType,
      gameFowlSkillsCategory,
      gameFowlSkillSet,
    });

    const savedGameFowlSkills = await newGameFowlSkills.save();

    const populatedGameFowlSkills = await dbGameFowlSkills
      .findById(savedGameFowlSkills._id)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlSkillsCategory");

    if (!populatedGameFowlSkills) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlType and GameFowlSkillsCategory",
        })
      );
    }

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlSkills: populatedGameFowlSkills._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlSkills: [populatedGameFowlSkills._id],
      }).save();
    }

    res.json(
      response.success({
        item: populatedGameFowlSkills,
        message: "New game fowl skills successfully saved!",
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

export const updateGameFowlSkills = async (req: Request, res: Response) => {
  const skillsId = req.params.skillsId;
  const {
    gameFowlType,
    gameFowlSkillsCategory,
    gameFowlSkillSet,
  }: T_Game_Fowl_Skills = req.body;
  try {
    const updatedSkills = await dbGameFowlSkills.findByIdAndUpdate(
      skillsId,
      {
        $set: {
          gameFowlType,
          gameFowlSkillsCategory,
          gameFowlSkillSet,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedSkills) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    const populatedSkills = await dbGameFowlSkills
      .findById(updatedSkills._id)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlSkillsCategory");

    if (!populatedSkills) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlSkills",
        })
      );
    }

    res.json(
      response.success({
        item: populatedSkills,
        message: "Skills successfully updated!",
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

export const deleteGameFowlSkills = async (req: Request, res: Response) => {
  const skillsId = req.params.skillsId;
  try {
    const deletedSkills = await dbGameFowlSkills
      .findById(skillsId)
      .populate({
        path: "gameFowlType",
        populate: { path: "gameFowlClass" },
      })
      .populate("gameFowlSkillsCategory");

    if (!deletedSkills) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlSkills.findByIdAndDelete(skillsId);

    res.json(
      response.success({
        item: deletedSkills,
        message: "Skills successfully deleted!",
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
