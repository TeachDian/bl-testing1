import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlFederation from "@/models/dbGameFowlFederation";
import dbGameFowlLocalAssociation from "@/models/dbGameFowlLocalAssociation";
import { T_Game_Fowl_Local_Association } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlLocalAssociationById = async (
  req: Request,
  res: Response
) => {
  const associationId = req.params.associationId;
  try {
    const association = await dbGameFowlLocalAssociation
      .findById(associationId)
      .populate("federation");
    if (!association) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: association }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameGameFowlLocalAssociation = async (
  req: Request,
  res: Response
) => {
  const { localAssociation, federation }: T_Game_Fowl_Local_Association =
    req.body;
  try {
    const existingFederation = await dbGameFowlFederation.findById(federation);
    if (!existingFederation) {
      return res.json(
        response.error({
          message: "Invalid GameFowlFederation ID provided",
        })
      );
    }

    const newGameFowlLocalAssociation = new dbGameFowlLocalAssociation({
      localAssociation,
      federation,
    });

    const savedGameFowlLocalAssociation =
      await newGameFowlLocalAssociation.save();

    const populatedGameFowlLocalAssociation = await dbGameFowlLocalAssociation
      .findById(savedGameFowlLocalAssociation._id)
      .populate("federation");

    if (!populatedGameFowlLocalAssociation) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlLocalAssociation",
        })
      );
    }

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: {
            gameFowlLocalAssociation: populatedGameFowlLocalAssociation._id,
          },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlLocalAssociation: [populatedGameFowlLocalAssociation._id],
      }).save();
    }

    res.json(
      response.success({
        item: populatedGameFowlLocalAssociation,
        message: "New game fowl local association successfully saved!",
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

export const updateGameFowlLocalAssociation = async (
  req: Request,
  res: Response
) => {
  const associationId = req.params.associationId;
  const { localAssociation, federation }: T_Game_Fowl_Local_Association =
    req.body;
  try {
    const updatedAssociation =
      await dbGameFowlLocalAssociation.findByIdAndUpdate(
        associationId,
        {
          $set: {
            localAssociation,
            federation,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );

    if (!updatedAssociation) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    const populatedAssociation = await dbGameFowlLocalAssociation
      .findById(updatedAssociation._id)
      .populate("federation");

    if (!updatedAssociation) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlLocalAssociation",
        })
      );
    }

    res.json(
      response.success({
        item: populatedAssociation,
        message: "Association successfully updated!",
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

export const deleteGameFowlLocalAssociation = async (
  req: Request,
  res: Response
) => {
  const associationId = req.params.associationId;
  try {
    const deletedAssociation = await dbGameFowlLocalAssociation
      .findById(associationId)
      .populate("federation");

    if (!deletedAssociation) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlLocalAssociation.findByIdAndDelete(associationId);

    res.json(
      response.success({
        item: deletedAssociation,
        message: "Association successfully deleted!",
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
