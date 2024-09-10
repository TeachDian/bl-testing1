import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbNews from "@/models/dbNews";
import dbPhotos from "@/models/dbPhotos";
import dbWebContents from "@/models/dbWebContents";
import {
  T_News,
  T_Update_News_Status,
  Z_Photo,
  Z_Update_News_Status,
} from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await dbNews.find();
    res.json(
      response.success({
        items: news,
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

export const getNewsById = async (req: Request, res: Response) => {
  const newsId = req.params.newsId;
  try {
    const news = await dbNews.findById(newsId);
    if (!news) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: news }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addNews = async (req: Request, res: Response) => {
  const { newsTitle, newsDate, newsHost, newsDescription }: T_News = req.body;
  try {
    const newNews = new dbNews({
      newsTitle,
      newsDate,
      newsHost,
      newsDescription,
    });

    const savedNews = await newNews.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { news: savedNews._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ news: [savedNews._id] }).save();
    }

    res.json(
      response.success({
        item: savedNews,
        message: "New news successfully saved!",
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

export const updateNews = async (req: Request, res: Response) => {
  const newsId = req.params.newsId;
  const { newsTitle, newsDate, newsHost, newsDescription }: T_News = req.body;
  try {
    const updatedNews = await dbNews.findByIdAndUpdate(
      { _id: newsId },
      {
        $set: {
          newsTitle,
          newsDate,
          newsHost,
          newsDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedNews) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedNews,
        message: "News successfully updated!",
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

export const deleteNews = async (req: Request, res: Response) => {
  const newsId = req.params.newsId;
  try {
    const deletedNews = await dbNews.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedNews,
        message: "News successfully deleted!",
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

export const addNewsPhoto = async (req: Request, res: Response) => {
  const newsId = req.params.newsId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !newsId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        newsId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbNews.findByIdAndUpdate(
        newsId,
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

export const updateNewsStatus = async (req: Request, res: Response) => {
  const newsId = req.params.newsId;
  const { status }: T_Update_News_Status = req.body;
  const isValidInput = Z_Update_News_Status.safeParse(req.body);
  if (isValidInput.success) {
    try {
      const news = await dbNews.findOne({
        _id: newsId,
        deletedAt: null,
      });
      if (!news) {
        return res.json(response.error({ message: RECORD_DOES_NOT_EXIST }));
      }

      const updateStatus = await dbNews.findByIdAndUpdate(
        newsId,
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
          message: "News is now " + status,
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
