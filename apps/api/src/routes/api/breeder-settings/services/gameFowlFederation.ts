import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlFederation from "@/models/dbGameFowlFederation";
import { T_Game_Fowl_Federation } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlFederationById = async (
  req: Request,
  res: Response
) => {
  const federationId = req.params.federationId;
  try {
    const gameFowlFederation =
      await dbGameFowlFederation.findById(federationId);
    if (!federationId) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: gameFowlFederation }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlFederation = async (req: Request, res: Response) => {
  const { federationTitle }: T_Game_Fowl_Federation = req.body;
  try {
    const newGameFowlFederation = new dbGameFowlFederation({
      federationTitle,
    });

    const savedGameFowlFederation = await newGameFowlFederation.save();

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlFederation: savedGameFowlFederation._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlFederation: [savedGameFowlFederation._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedGameFowlFederation,
        message: "New game fowl federation successfully saved!",
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

export const updateGameFowlFederation = async (req: Request, res: Response) => {
  const federationId = req.params.federationId;
  const { federationTitle }: T_Game_Fowl_Federation = req.body;
  try {
    const updatedTitle = await dbGameFowlFederation.findByIdAndUpdate(
      { _id: federationId },
      {
        $set: {
          federationTitle,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedTitle,
        message: "Title successfully updated!",
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

export const deleteGameFowlFederation = async (req: Request, res: Response) => {
  const federationId = req.params.federationId;
  try {
    const deletedTitle =
      await dbGameFowlFederation.findByIdAndDelete(federationId);
    if (!deletedTitle) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedTitle,
        message: "Title successfully deleted!",
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
