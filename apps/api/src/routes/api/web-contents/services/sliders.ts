import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbPhotos from "@/models/dbPhotos";
import dbSliders from "@/models/dbSliders";
import dbWebContents from "@/models/dbWebContents";
import {
  T_Sliders,
  T_Update_Slider_Status,
  T_Update_Sliders,
  Z_Photo,
  Z_Update_Slider_Status,
} from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllSliders = async (req: Request, res: Response) => {
  try {
    const sliders = await dbSliders.find();
    res.json(
      response.success({
        items: sliders,
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

export const getSliderById = async (req: Request, res: Response) => {
  const sliderId = req.params.sliderId;
  try {
    const slider = await dbSliders.findById(sliderId);
    if (!slider) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: slider }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addSlider = async (req: Request, res: Response) => {
  const { sliderDescription }: T_Sliders = req.body;
  try {
    const newSlider = new dbSliders({
      sliderDescription,
    });

    const savedSlider = await newSlider.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { sliders: savedSlider._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ sliders: [savedSlider._id] }).save();
    }

    res.json(
      response.success({
        item: savedSlider,
        message: "New slider successfully saved!",
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

export const updateSlider = async (req: Request, res: Response) => {
  const sliderId = req.params.sliderId;
  const { sliderDescription }: T_Update_Sliders = req.body;
  try {
    const updatedSlider = await dbSliders.findByIdAndUpdate(
      { _id: sliderId },
      {
        $set: {
          sliderDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedSlider) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedSlider,
        message: "Slider successfully updated!",
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

export const deleteSlider = async (req: Request, res: Response) => {
  const sliderId = req.params.sliderId;
  try {
    const deletedSlider = await dbSliders.findByIdAndDelete(sliderId);
    if (!deletedSlider) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedSlider,
        message: "Slider successfully deleted!",
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

export const addSliderPhoto = async (req: Request, res: Response) => {
  const sliderId = req.params.sliderId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !sliderId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        sliderId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbSliders.findByIdAndUpdate(
        sliderId,
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

export const updateSliderStatus = async (req: Request, res: Response) => {
  const sliderId = req.params.sliderId;
  const { status }: T_Update_Slider_Status = req.body;
  const isValidInput = Z_Update_Slider_Status.safeParse(req.body);
  if (isValidInput.success) {
    try {
      const slider = await dbSliders.findOne({
        _id: sliderId,
        deletedAt: null,
      });
      if (!slider) {
        return res.json(response.error({ message: RECORD_DOES_NOT_EXIST }));
      }

      const updateStatus = await dbSliders.findByIdAndUpdate(
        sliderId,
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
          message: "Slider is now " + status,
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
