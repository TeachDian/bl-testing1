import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbSocialLinks from "@/models/dbSocialLinks";
import dbWebContents from "@/models/dbWebContents";
import { T_Social_Links, T_Update_Social_Links } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getSocialLinksById = async (req: Request, res: Response) => {
  const socialId = req.params.socialId;
  try {
    const socialLinks = await dbSocialLinks.findById(socialId);
    if (!socialLinks) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: socialLinks }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addSocialLinks = async (req: Request, res: Response) => {
  const { facebook, twitter, instagram, tikTok }: T_Social_Links = req.body;
  try {
    const newSocialLinks = new dbSocialLinks({
      facebook,
      twitter,
      instagram,
      tikTok,
    });
    const savedSocialLinks = await newSocialLinks.save();

    let webContents = await dbWebContents.findOne();

    if (webContents) {
      await dbWebContents.findByIdAndUpdate(
        webContents._id,
        {
          $push: {
            socialLinks: savedSocialLinks._id,
          },
          $set: {
            updatedAt: new Date(),
          },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ socialLinks: [savedSocialLinks._id] }).save();
    }

    res.json(
      response.success({
        item: savedSocialLinks,
        message: "New social links successfully saved!",
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

export const updateSocialLinks = async (req: Request, res: Response) => {
  const socialId = req.params.socialId;
  const { facebook, twitter, instagram, tikTok }: T_Update_Social_Links =
    req.body;
  try {
    const updatedSocialLinks = await dbSocialLinks.findByIdAndUpdate(
      { _id: socialId },
      {
        $set: {
          facebook,
          twitter,
          instagram,
          tikTok,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedSocialLinks) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedSocialLinks,
        message: "Social links successfully updated!",
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

export const deleteSocialLinks = async (req: Request, res: Response) => {
  const socialId = req.params.socialId;
  try {
    const deletedSocialLinks = await dbSocialLinks.findByIdAndDelete(socialId);
    if (!deletedSocialLinks) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedSocialLinks,
        message: "Social links successfully deleted!",
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
