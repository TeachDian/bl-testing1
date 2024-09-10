import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import dbGameFowlGender from "@/models/dbGameFowlGender";
import dbGameFowlSkills from "@/models/dbGameFowlSkills";
import dbGameFowlStatus from "@/models/dbGameFowlStatus";
import { T_Game_Fowl_Status } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getGameFowlStatusById = async (req: Request, res: Response) => {
  const statusId = req.params.statusId;
  try {
    const status = await dbGameFowlStatus
      .findById(statusId)
      .populate("gameFowlGender");
    if (!status) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: status }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addGameFowlStatus = async (req: Request, res: Response) => {
  const {
    gameFowlGender,
    gameFowlStatus,
    gameFowlAgeRange,
    description,
  }: T_Game_Fowl_Status = req.body;
  try {
    const existingGender = await dbGameFowlGender.findById(gameFowlGender);
    if (!existingGender) {
      return res.json(
        response.error({
          message: "Invalid GameFowlGender ID provided",
        })
      );
    }

    const newGameFowlStatus = new dbGameFowlStatus({
      gameFowlGender,
      gameFowlStatus,
      gameFowlAgeRange,
      description,
    });

    const savedGameFowlStatus = await newGameFowlStatus.save();

    const populatedGameFowlStatus = await dbGameFowlStatus
      .findById(savedGameFowlStatus._id)
      .populate("gameFowlGender");

    if (!populatedGameFowlStatus) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlGender",
        })
      );
    }

    let breederSettings = await dbBreederSettings.findOne();

    if (breederSettings) {
      await dbBreederSettings.findByIdAndUpdate(
        breederSettings._id,
        {
          $push: { gameFowlStatus: populatedGameFowlStatus._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederSettings({
        gameFowlStatus: [populatedGameFowlStatus._id],
      }).save();
    }

    res.json(
      response.success({
        item: populatedGameFowlStatus,
        message: "New game fowl status successfully saved!",
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

export const updateGameFowlStatus = async (req: Request, res: Response) => {
  const statusId = req.params.statusId;
  const {
    gameFowlGender,
    gameFowlStatus,
    gameFowlAgeRange,
    description,
  }: T_Game_Fowl_Status = req.body;
  try {
    const updatedStatus = await dbGameFowlStatus.findByIdAndUpdate(
      statusId,
      {
        $set: {
          gameFowlGender,
          gameFowlStatus,
          gameFowlAgeRange,
          description,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedStatus) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    const populatedStatus = await dbGameFowlStatus
      .findById(updatedStatus._id)
      .populate("gameFowlGender");

    if (!populatedStatus) {
      return res.json(
        response.error({
          message: "Failed to populate GameFowlStatus",
        })
      );
    }

    res.json(
      response.success({
        item: populatedStatus,
        message: "Status successfully updated!",
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

export const deleteGameFowlStatus = async (req: Request, res: Response) => {
  const statusId = req.params.statusId;
  try {
    const deletedStatus = await dbGameFowlStatus
      .findById(statusId)
      .populate("gameFowlGender");

    if (!deletedStatus) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlStatus.findByIdAndDelete(statusId);

    res.json(
      response.success({
        item: deletedStatus,
        message: "Status successfully deleted!",
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
