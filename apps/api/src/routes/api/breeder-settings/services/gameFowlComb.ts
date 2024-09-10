import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlComb from "@/models/dbGameFowlComb";
import { T_Game_Fowl_Comb } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlCombById = async (req: Request, res: Response) => {
  const combId = req.params.combId;
  try {
    const gameFowlComb = await dbGameFowlComb.findById(combId);
    if (!combId) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: gameFowlComb }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlComb = async (req: Request, res: Response) => {
  const { comb }: T_Game_Fowl_Comb = req.body;
  try {
    const newGameFowlComb = new dbGameFowlComb({
      comb,
    });

    const savedGameFowlComb = await newGameFowlComb.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlComb: savedGameFowlComb._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlComb: [savedGameFowlComb._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlComb,
        message: "New game fowl comb successfully saved!",
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

export const updateGameFowlComb = async (req: Request, res: Response) => {
  const combId = req.params.combId;
  const { comb }: T_Game_Fowl_Comb = req.body;
  try {
    const updatedComb = await dbGameFowlComb.findByIdAndUpdate(
      { _id: combId },
      {
        $set: {
          comb,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedComb) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedComb,
        message: "Comb successfully updated!",
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

export const deleteGameFowlComb = async (req: Request, res: Response) => {
  const combId = req.params.combId;
  try {
    const deletedComb = await dbGameFowlComb.findByIdAndDelete(combId);
    if (!deletedComb) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedComb,
        message: "Comb successfully deleted!",
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
