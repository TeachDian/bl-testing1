import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlBodyColor from "@/models/dbGameFowlBodyColor";
import { T_Game_Fowl_Body_Color } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlBodyColorById = async (req: Request, res: Response) => {
  const bodyColorId = req.params.bodyColorId;
  try {
    const bodyColor = await dbGameFowlBodyColor.findById(bodyColorId);
    if (!bodyColorId) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: bodyColor }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlBodyColor = async (req: Request, res: Response) => {
  const { colorTitle, colorDetails }: T_Game_Fowl_Body_Color = req.body;
  try {
    const newBodyColor = new dbGameFowlBodyColor({
      colorTitle,
      colorDetails,
    });

    const savedBodyColor = await newBodyColor.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gamFowlBodyColor: savedBodyColor._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gamFowlBodyColor: [savedBodyColor._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedBodyColor,
        message: "New feather color successfully saved!",
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

export const updateGameFowlBodyColor = async (req: Request, res: Response) => {
  const bodyColorId = req.params.bodyColorId;
  const { colorTitle, colorDetails }: T_Game_Fowl_Body_Color = req.body;
  try {
    const updatedBodyColor = await dbGameFowlBodyColor.findByIdAndUpdate(
      { _id: bodyColorId },
      {
        $set: {
          colorTitle,
          colorDetails,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedBodyColor) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedBodyColor,
        message: "Feather color successfully updated!",
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

export const deleteGameFowlBodyColor = async (req: Request, res: Response) => {
  const bodyColorId = req.params.bodyColorId;
  try {
    const deletedBodyColor =
      await dbGameFowlBodyColor.findByIdAndDelete(bodyColorId);
    if (!deletedBodyColor) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedBodyColor,
        message: "Feather color successfully deleted!",
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
