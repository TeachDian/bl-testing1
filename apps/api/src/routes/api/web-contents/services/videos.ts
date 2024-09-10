import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbVideos from "@/models/dbVideos";
import dbWebContents from "@/models/dbWebContents";
import { T_Videos } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await dbVideos.find();
    res.json(
      response.success({
        items: videos,
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

export const getVideoById = async (req: Request, res: Response) => {
  const videoId = req.params.videoId;
  try {
    const video = await dbVideos.findById(videoId);
    if (!video) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: video }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addVideo = async (req: Request, res: Response) => {
  const {
    videoTitle,
    videoDate,
    videoHost,
    videoLink,
    videoDescription,
  }: T_Videos = req.body;
  try {
    const newVideo = new dbVideos({
      videoTitle,
      videoDate,
      videoHost,
      videoLink,
      videoDescription,
    });

    const savedVideo = await newVideo.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { videos: savedVideo._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ videos: [savedVideo._id] }).save();
    }

    res.json(
      response.success({
        item: savedVideo,
        message: "New video successfully saved!",
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

export const updateVideo = async (req: Request, res: Response) => {
  const videoId = req.params.videoId;
  const {
    videoTitle,
    videoDate,
    videoHost,
    videoLink,
    videoDescription,
  }: T_Videos = req.body;
  try {
    const updatedVideo = await dbVideos.findByIdAndUpdate(
      { _id: videoId },
      {
        $set: {
          videoTitle,
          videoDate,
          videoHost,
          videoLink,
          videoDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedVideo) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedVideo,
        message: "Video successfully updated!",
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

export const deleteVideo = async (req: Request, res: Response) => {
  const videoId = req.params.videoId;
  try {
    const deletedVideo = await dbVideos.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedVideo,
        message: "Video successfully deleted!",
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
