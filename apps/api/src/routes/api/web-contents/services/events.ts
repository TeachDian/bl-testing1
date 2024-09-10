import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbEvents from "@/models/dbEvents";
import dbPhotos from "@/models/dbPhotos";
import dbWebContents from "@/models/dbWebContents"; // Import the WebContents model
import {
  T_Events,
  T_Update_Event_Status,
  Z_Photo,
  Z_Update_Event_Status,
} from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await dbEvents.find();
    res.json(
      response.success({
        items: events,
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

export const getEventById = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  try {
    const event = await dbEvents.findById(eventId);
    if (!event) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: event }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addEvent = async (req: Request, res: Response) => {
  const { eventTitle, eventDates, eventDescription }: T_Events = req.body;
  try {
    const newEvent = new dbEvents({
      eventTitle,
      eventDates,
      eventDescription,
    });

    const savedEvent = await newEvent.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { events: savedEvent._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ events: [savedEvent._id] }).save();
    }

    res.json(
      response.success({
        item: savedEvent,
        message: "New event successfully saved!",
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

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const { eventTitle, eventDates, eventDescription }: T_Events = req.body;
  try {
    const updatedEvent = await dbEvents.findByIdAndUpdate(
      { _id: eventId },
      {
        $set: {
          eventTitle,
          eventDates,
          eventDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedEvent,
        message: "Event successfully updated!",
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

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  try {
    const deletedEvent = await dbEvents.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedEvent,
        message: "Event successfully deleted!",
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

export const addEventPhoto = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !eventId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        eventId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbEvents.findByIdAndUpdate(
        eventId,
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

export const updateEventStatus = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const { status }: T_Update_Event_Status = req.body;
  const isValidInput = Z_Update_Event_Status.safeParse(req.body);
  if (isValidInput.success) {
    try {
      const event = await dbEvents.findOne({
        _id: eventId,
        deletedAt: null,
      });
      if (!event) {
        return res.json(response.error({ message: RECORD_DOES_NOT_EXIST }));
      }

      const updateStatus = await dbEvents.findByIdAndUpdate(
        eventId,
        {
          $set: {
            status: status,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );
      res.json(
        response.success({
          item: updateStatus,
          message: "Event is now " + status,
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
