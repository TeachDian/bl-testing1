import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbBillboards from "@/models/dbBillboards";
import dbPhotos from "@/models/dbPhotos";
import dbWebContents from "@/models/dbWebContents";
import {
  T_Billboards,
  T_Update_Billboard_Status,
  T_Update_Billboards,
  Z_Photo,
  Z_Update_Billboard_Status,
} from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllBillboards = async (req: Request, res: Response) => {
  try {
    const billboard = await dbBillboards.find();
    res.json(
      response.success({
        items: billboard,
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

export const getBillboardById = async (req: Request, res: Response) => {
  const billboardId = req.params.billboardId;
  try {
    const billboard = await dbBillboards.findById(billboardId);
    if (!billboard) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: billboard }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addBillboard = async (req: Request, res: Response) => {
  const { startDate, endDate }: T_Billboards = req.body;
  try {
    const newBillboard = new dbBillboards({
      startDate,
      endDate,
    });

    const savedBillboard = await newBillboard.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { billboards: savedBillboard._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ billboard: [savedBillboard._id] }).save();
    }

    res.json(
      response.success({
        item: savedBillboard,
        message: "New billboard successfully saved!",
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

export const updateBillboard = async (req: Request, res: Response) => {
  const billboardId = req.params.billboardId;
  const { startDate, endDate }: T_Update_Billboards = req.body;
  try {
    const updatedBillboard = await dbBillboards.findByIdAndUpdate(
      { _id: billboardId },
      {
        $set: {
          startDate,
          endDate,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedBillboard) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: updatedBillboard,
        message: "Billboard successfully updated!",
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

export const deleteBillboard = async (req: Request, res: Response) => {
  const billboardId = req.params.billboardId;
  try {
    const deletedBillboard = await dbBillboards.findByIdAndDelete(billboardId);
    if (!deletedBillboard) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(
      response.success({
        item: deletedBillboard,
        message: "Billboard successfully deleted!",
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

export const addBillboardPhoto = async (req: Request, res: Response) => {
  const billboardId = req.params.billboardId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !billboardId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        billboardId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbBillboards.findByIdAndUpdate(
        billboardId,
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

export const updateBillboardStatus = async (req: Request, res: Response) => {
  const billboardId = req.params.billboardId;
  const { status }: T_Update_Billboard_Status = req.body;
  const isValidInput = Z_Update_Billboard_Status.safeParse(req.body);
  if (isValidInput.success) {
    try {
      const billboard = await dbBillboards.findOne({
        _id: billboardId,
        deletedAt: null,
      });
      if (!billboard) {
        return res.json(response.error({ message: RECORD_DOES_NOT_EXIST }));
      }

      const updateStatus = await dbBillboards.findByIdAndUpdate(
        billboardId,
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
          message: "Billboard is now " + status,
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
