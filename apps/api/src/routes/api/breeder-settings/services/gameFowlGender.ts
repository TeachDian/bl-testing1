import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlGender from "@/models/dbGameFowlGender";
import { T_Game_Fowl_Gender } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlGenderById = async (req: Request, res: Response) => {
  const genderId = req.params.genderId;
  try {
    const gender = await dbGameFowlGender.findById(genderId);
    if (!gender) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: gender }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlGender = async (req: Request, res: Response) => {
  const { genderTitle }: T_Game_Fowl_Gender = req.body;
  try {
    const newGameFowlGender = new dbGameFowlGender({
      genderTitle,
    });

    const savedGameFowlGender = await newGameFowlGender.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlGender: savedGameFowlGender._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlGender: [savedGameFowlGender._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlGender,
        message: "New game fowl gender successfully saved!",
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

export const updateGameFowlGender = async (req: Request, res: Response) => {
  const genderId = req.params.genderId;
  const { genderTitle }: T_Game_Fowl_Gender = req.body;
  try {
    const updatedGender = await dbGameFowlGender.findByIdAndUpdate(
      { _id: genderId },
      {
        $set: {
          genderTitle,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedGender) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedGender,
        message: "Gender successfully updated!",
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

export const deleteGameFowlGender = async (req: Request, res: Response) => {
  const genderId = req.params.genderId;
  try {
    const deletedGender = await dbGameFowlGender.findByIdAndDelete(genderId);
    if (!deletedGender) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedGender,
        message: "Gender successfully deleted!",
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
