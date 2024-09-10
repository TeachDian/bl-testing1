import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbAboutUs from "@/models/dbAboutUs";
import dbWebContents from "@/models/dbWebContents";
import { T_About_Us } from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();

export const getAboutUs = async (req: Request, res: Response) => {
  try {
    const aboutUs = await dbAboutUs.findOne();
    if (!aboutUs) {
      return res.json(
        response.error({
          message: "Not found!",
        })
      );
    }
    res.json(response.success({ item: aboutUs }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

// export const addAboutUs = async (req: Request, res: Response) => {
//   const {
//     systemName,
//     systemInformation,
//     vision,
//     mission,
//     version,
//     systemDescription,
//   }: T_About_Us = req.body;
//   try {
//     const existingAboutUs = await dbAboutUs.findOne();

//     if (existingAboutUs) {
//       return res.json(
//         response.error({
//           message: "There is an existing About Us content",
//         })
//       );
//     }

//     const newAboutUs = new dbAboutUs({
//       systemName,
//       systemInformation,
//       vision,
//       mission,
//       version,
//       systemDescription,
//     });

//     const savedAboutUs = await newAboutUs.save();

//     res.json(
//       response.success({
//         item: savedAboutUs,
//         message: "About Us successfully saved!",
//       })
//     );
//   } catch (err: any) {
//     return res.json(
//       response.error({
//         message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
//       })
//     );
//   }
// };

export const addAboutUs = async (req: Request, res: Response) => {
  const {
    systemName,
    systemInformation,
    vision,
    mission,
    version,
    systemDescription,
  }: T_About_Us = req.body;
  try {
    const existingAboutUs = await dbAboutUs.findOne();

    if (existingAboutUs) {
      return res.json(
        response.error({
          message: "There is an existing About Us content",
        })
      );
    }

    const newAboutUs = new dbAboutUs({
      systemName,
      systemInformation,
      vision,
      mission,
      version,
      systemDescription,
    });

    const savedAboutUs = await newAboutUs.save();

    let webContent = await dbWebContents.findOne();

    if (webContent) {
      await dbWebContents.findByIdAndUpdate(
        webContent._id,
        {
          $push: { aboutUs: savedAboutUs._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbWebContents({ aboutUs: [savedAboutUs._id] }).save();
    }

    res.json(
      response.success({
        item: savedAboutUs,
        message: "New About us successfully saved!",
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

export const updateAboutUs = async (req: Request, res: Response) => {
  const {
    systemName,
    systemInformation,
    vision,
    mission,
    version,
    systemDescription,
  }: T_About_Us = req.body;
  try {
    const updatedAboutUs = await dbAboutUs.findOneAndUpdate(
      {},
      {
        $set: {
          systemName,
          systemInformation,
          vision,
          mission,
          version,
          systemDescription,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    if (!updatedAboutUs) {
      return res.json(
        response.error({
          message: "Not found!",
        })
      );
    }
    res.json(
      response.success({
        item: updatedAboutUs,
        message: "About us successfully updated!",
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

export const deletedAboutUs = async (req: Request, res: Response) => {
  try {
    const deletedAboutUs = await dbAboutUs.findOneAndDelete();
    if (!deletedAboutUs) {
      return res.json(
        response.error({
          message: "Not found!",
        })
      );
    }
    res.json(
      response.success({
        item: deletedAboutUs,
        message: "About us successfully deleted!",
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
