import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbActivities from "@/models/dbActivities";
import dbEvents from "@/models/dbEvents";
import dbPhotos from "@/models/dbPhotos";
import dbWebContents from "@/models/dbWebContents";
import { T_Activities, Z_Photo } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await dbActivities.find();
    res.json(
      response.success({
        items: activities,
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

export const getActivityById = async (req: Request, res: Response) => {
  const activityId = req.params.activityId;
  try {
    const activity = await dbActivities.findById(activityId);
    if (!activity) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: activity }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addActivity = async (req: Request, res: Response) => {
  const {
    activityTitle,
    activityHost,
    activityDate,
    activityDescription,
  }: T_Activities = req.body;
  try {
    const newActivity = new dbActivities({
      activityTitle,
      activityHost,
      activityDate,
      activityDescription,
    });

    const savedActivity = await newActivity.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { activities: savedActivity._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ activities: [savedActivity._id] }).save();
    }

    res.json(
      response.success({
        item: savedActivity,
        message: "New activity successfully saved!",
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

export const updateActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId;
  const {
    activityTitle,
    activityHost,
    activityDate,
    activityDescription,
  }: T_Activities = req.body;
  try {
    const updatedActivity = await dbActivities.findByIdAndUpdate(
      { _id: activityId },
      {
        $set: {
          activityTitle,
          activityHost,
          activityDate,
          activityDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedActivity) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedActivity,
        message: "Activity successfully updated!",
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

export const deleteActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId;
  try {
    const deletedActivity = await dbActivities.findByIdAndDelete(activityId);
    if (!deletedActivity) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedActivity,
        message: "Activity successfully deleted!",
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

export const addActivityPhoto = async (req: Request, res: Response) => {
  const activityId = req.params.activityId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !activityId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        activityId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbActivities.findByIdAndUpdate(
        activityId,
        {
          $push: {
            photos: uploadedPhoto._id,
          },
          $set: {
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
      res.json(
        response.success({
          item: updatePhotos,
          message: "Photos was updated",
        })
      );
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      );
    }
  } else {
    return res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    );
  }
};
