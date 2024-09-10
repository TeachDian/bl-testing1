import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbWebContents from "@/models/dbWebContents";
import { Request, Response } from "express";

const response = new ResponseService();

export const getWebContents = async (req: Request, res: Response) => {
  try {
    const webContents = await dbWebContents
      .find({ deletedAt: null })
      .populate({
        path: "activities",
        populate: [{ path: "photos" }],
      })
      .populate({
        path: "events",
        populate: [{ path: "photos" }],
      })
      .populate({
        path: "news",
        populate: [{ path: "photos" }],
      })
      .populate("videos")
      .populate({
        path: "sliders",
        populate: [{ path: "photos" }],
      })
      .populate("billboards")
      .populate("socialLinks")
      .populate("aboutUs");

    const filteredWebContents = webContents.reverse();
    res.json(
      response.success({
        items: filteredWebContents,
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const getWebContentsById = async (req: Request, res: Response) => {
  const contentId = req.params.contentId;
  try {
    const webContents = await dbWebContents
      .find({ _id: contentId, deletedAt: null })
      .populate("activities")
      .populate("events")
      .populate("news")
      .populate("videos")
      .populate("sliders")
      .populate("billboards");

    const filteredWebContents = webContents.reverse();
    res.json(
      response.success({
        items: filteredWebContents,
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};
