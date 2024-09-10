import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlClass from "@/models/dbGameFowlClass";
import { T_Game_Fowl_Class } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlClassById = async (req: Request, res: Response) => {
  const classId = req.params.classId;
  try {
    const classTitle = await dbGameFowlClass.findById(classId);
    if (!classTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: classTitle }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlClass = async (req: Request, res: Response) => {
  const { classTitle }: T_Game_Fowl_Class = req.body;
  try {
    const newGameFowlClass = new dbGameFowlClass({
      classTitle,
    });

    const savedGameFowlClass = await newGameFowlClass.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlClass: savedGameFowlClass._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlClass: [savedGameFowlClass._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlClass,
        message: "New game fowl class successfully saved!",
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

export const updateGameFowlClass = async (req: Request, res: Response) => {
  const classId = req.params.classId;
  const { classTitle }: T_Game_Fowl_Class = req.body;
  try {
    const updatedClassTitle = await dbGameFowlClass.findByIdAndUpdate(
      { _id: classId },
      {
        $set: {
          classTitle,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedClassTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedClassTitle,
        message: "Class title successfully updated!",
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

export const deleteGameFowlClass = async (req: Request, res: Response) => {
  const classId = req.params.classId;
  try {
    const deletedClassTitle = await dbGameFowlClass.findByIdAndDelete(classId);
    if (!deletedClassTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedClassTitle,
        message: "Class title successfully deleted!",
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
