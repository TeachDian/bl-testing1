import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlClass from "@/models/dbGameFowlClass";
import dbGameFowlType from "@/models/dbGameFowlType";
import { T_Game_Fowl_Type } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlTypeById = async (req: Request, res: Response) => {
  const typeId = req.params.typeId;
  try {
    const type = await dbGameFowlType
      .findById(typeId)
      .populate("gameFowlClass");
    if (!type) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: type }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlType = async (req: Request, res: Response) => {
  const { gameFowlType, gameFowlClass }: T_Game_Fowl_Type = req.body;
  try {
    const existingClass = await dbGameFowlClass.findById(gameFowlClass);
    if (!existingClass) {
      return res.json(
        response.error({
          message: "Invalid GameFowlClass ID provided",
        })
      );
    }

    const newGameFowlType = new dbGameFowlType({
      gameFowlType,
      gameFowlClass,
    });

    const savedGameFowlType = await newGameFowlType.save();

    const populatedGameFowlType = await dbGameFowlType
      .findById(savedGameFowlType._id)
      .populate("gameFowlClass");

    if (!populatedGameFowlType) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlType",
        })
      );
    }

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlType: populatedGameFowlType._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlType: [populatedGameFowlType._id],
      }).save();
    }

    res.json(
      response.success({
        item: populatedGameFowlType,
        message: "New game fowl type successfully saved!",
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

export const updateGameFowlType = async (req: Request, res: Response) => {
  const typeId = req.params.typeId;
  const { gameFowlClass, gameFowlType }: T_Game_Fowl_Type = req.body;
  try {
    const updatedType = await dbGameFowlType.findByIdAndUpdate(
      typeId,
      {
        $set: {
          gameFowlClass,
          gameFowlType,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedType) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    const populatedType = await dbGameFowlType
      .findById(updatedType._id)
      .populate("gameFowlClass");

    if (!populatedType) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlType",
        })
      );
    }

    res.json(
      response.success({
        item: populatedType,
        message: "Type successfully updated!",
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

export const deleteGameFowlType = async (req: Request, res: Response) => {
  const typeId = req.params.typeId;
  try {
    const deletedType = await dbGameFowlType
      .findById(typeId)
      .populate("gameFowlClass");

    if (!deletedType) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlType.findByIdAndDelete(typeId);

    res.json(
      response.success({
        item: deletedType,
        message: "Type successfully deleted!",
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
