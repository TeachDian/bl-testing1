import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbEvents from "@/models/dbEvents";
import dbPhotos from "@/models/dbPhotos";
import { Z_Photo, Z_Update_Photo } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const addEventPhoto = async (req: Request, res: Response) => {
  const contentId = req.params.contentId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !contentId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        contentId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbEvents.findByIdAndUpdate(
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

export const updateEventPhoto = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const photoId = req.params.photoId;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Update_Photo.safeParse(req.body);
  if (isValidInput.success) {
    try {
      const getPhoto = await dbPhotos.findOne({
        _id: photoId,
        eventId,
        deletedAt: null,
      });
      if (!getPhoto) {
        return res.json(response.error({ message: "Photo not found" }));
      }
      const {
        description: dbDescription,
        tags: dbTags,
        isMain: dbIsMain,
      } = getPhoto;
      // Needed this to not update if nothing changes
      if (
        dbDescription === description &&
        dbTags === tags &&
        dbIsMain === isMain
      ) {
        return res.json(
          response.success({
            item: getPhoto,
            message: "Photos was updated",
          })
        );
      }
      const updatePhoto = await dbPhotos.findByIdAndUpdate(
        photoId,
        {
          $set: {
            description,
            tags,
            isMain,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
      res.json(
        response.success({
          item: updatePhoto,
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

export const deleteEventPhoto = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const photoId = req.params.photoId;
  if (!eventId || !photoId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  try {
    const getPhoto = await dbPhotos.findOne({
      _id: photoId,
      deletedAt: null,
    });
    if (!getPhoto) {
      return res.json(response.error({ message: "Photo not found" }));
    }
    const deletePhoto = await dbPhotos.findByIdAndDelete(photoId);
    await dbEvents.findByIdAndUpdate(
      getPhoto.eventId,
      {
        $pull: {
          photos: photoId,
        },
        $set: {
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    res.json(
      response.success({
        item: deletePhoto,
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
};
