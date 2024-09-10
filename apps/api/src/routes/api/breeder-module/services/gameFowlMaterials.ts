import {
  RECORD_DOES_NOT_EXIST,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { FileService } from "@/common/services/file";
import { ResponseService } from "@/common/services/response";
import dbBreederModule from "@/models/dbBreederModule";
import dbGameFowlBodyColor from "@/models/dbGameFowlBodyColor";
import dbGameFowlGender from "@/models/dbGameFowlGender";
import dbGameFowlLegColor from "@/models/dbGameFowlLegColor";
import dbGameFowlMaterials from "@/models/dbGameFowlMaterials";
import dbGameFowlStatus from "@/models/dbGameFowlStatus";
import dbGameFowlType from "@/models/dbGameFowlType";
import dbPhotos from "@/models/dbPhotos";
import {
  T_Game_Fowl_Materials,
  T_Update_Game_Fowl_Materials,
  Z_Photo,
} from "@repo/contract";
import { Request, Response } from "express";

const response = new ResponseService();
const fileService = new FileService();

export const getAllGameFowlMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await dbGameFowlMaterials
      .find()
      .populate("gender")
      .populate("bodyColor")
      .populate("legColor")
      .populate("status")
      .populate({
        path: "geneticComposition",
        populate: {
          path: "breedType",
        },
      });

    if (!materials) {
      return res.json(
        response.error({
          message: "No record found!",
        })
      );
    }

    res.json(
      response.success({
        items: materials,
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

export const addGameFowlMaterials = async (req: Request, res: Response) => {
  const {
    wingBandNumber,
    microchipNumber,
    markings,
    dateOfBirth,
    gender,
    bodyColor,
    legColor,
    originFarm,
    vaccine,
    status,
    geneticComposition,
    comb,
    history,
    miscellaneous,
  }: T_Game_Fowl_Materials = req.body;

  try {
    console.log("Gender ID:", gender);
    const existingGender = await dbGameFowlGender.findById(gender);

    console.log("Body Color ID:", bodyColor);
    const existingBodyColor = await dbGameFowlBodyColor.findById(bodyColor);

    console.log("Leg Color ID:", legColor);
    const existingLegColor = await dbGameFowlLegColor.findById(legColor);

    console.log("Status ID:", status);
    const existingStatus = await dbGameFowlStatus.findById(status);

    // if (
    //   !existingGender ||
    //   !existingBodyColor ||
    //   !existingLegColor ||
    //   !existingStatus
    // ) {
    //   console.error("Invalid ID detected.");
    //   return res.json(
    //     response.error({
    //       message: "Invalid ID",
    //     })
    //   );
    // }

    const processedGeneticComposition = await Promise.all(
      geneticComposition.map(async (comp) => {
        console.log("Breed Type ID:", comp.breedType);
        // const existingBreedType = await dbGameFowlType.findById(comp.breedType);
        // if (!existingBreedType) {
        //   console.error("Invalid breedType ID detected.");
        //   throw new Error("Invalid breedType ID");
        // }
        const geneticPercentage = comp.input1 / comp.input2;
        const geneticFraction = `${comp.input1}/${comp.input2}`;
        return {
          input1: comp.input1,
          input2: comp.input2,
          breedType: comp.breedType,
          geneticPercentage,
          geneticFraction,
        };
      })
    );

    const newGameFowlMaterials = new dbGameFowlMaterials({
      wingBandNumber,
      microchipNumber,
      markings,
      dateOfBirth,
      gender,
      bodyColor,
      legColor,
      originFarm,
      vaccine,
      status,
      geneticComposition: processedGeneticComposition,
      comb,
      history,
      miscellaneous,
    });

    const savedGameFowlMaterials = await newGameFowlMaterials.save();
    let breederModule = await dbBreederModule.findOne();
    if (breederModule) {
      await dbBreederModule.findByIdAndUpdate(
        breederModule._id,
        {
          $push: { gameFowlMaterials: savedGameFowlMaterials._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederModule({
        gameFowlMaterials: [savedGameFowlMaterials._id],
      }).save();
    }
    res.json(
      response.success({
        item: savedGameFowlMaterials,
        message: "New game fowl materials successfully saved!",
      })
    );
  } catch (err: any) {
    console.error("Error saving game fowl materials:", err.message);
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const getGameFowlMaterialsById = async (req: Request, res: Response) => {
  const gameFowlMaterialsId = req.params.gameFowlMaterialsId;
  try {
    const materials = await dbGameFowlMaterials
      .findById(gameFowlMaterialsId)
      .populate("gender")
      .populate("bodyColor")
      .populate("legColor")
      .populate("status")
      .populate("breedType");

    if (!materials) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: materials }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const updateGameFowlMaterials = async (req: Request, res: Response) => {
  const gameFowlMaterialsId = req.params.gameFowlMaterialsId;
  const {
    wingBandNumber,
    microchipNumber,
    markings,
    dateOfBirth,
    gender,
    bodyColor,
    legColor,
    originFarm,
    vaccine,
    status,
    comb,
    history,
    miscellaneous,
  }: T_Update_Game_Fowl_Materials = req.body;
  try {
    const updatedMaterials = await dbGameFowlMaterials.findByIdAndUpdate(
      gameFowlMaterialsId,
      {
        $set: {
          wingBandNumber,
          microchipNumber,
          dateOfBirth,
          gender,
          bodyColor,
          legColor,
          originFarm,
          vaccine,
          status,
          history,
          miscellaneous,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedMaterials) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    res.json(
      response.success({
        item: updatedMaterials,
        message: "Game fowl materials successfully updated!",
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

export const deleteGameFowlMaterials = async (req: Request, res: Response) => {
  const gameFowlMaterialsId = req.params.gameFowlMaterialsId;
  try {
    const deletedMaterials =
      await dbGameFowlMaterials.findById(gameFowlMaterialsId);
    if (!deleteGameFowlMaterials) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbGameFowlMaterials.findByIdAndDelete(gameFowlMaterialsId);

    res.json(
      response.success({
        item: deletedMaterials,
        message: "Game fowl materials successfully deleted!",
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

export const addGameFowlMaterialsPhoto = async (
  req: Request,
  res: Response
) => {
  const gameFowlMaterialsId = req.params.gameFowlMaterialsId;
  const files = req.files;
  const { description, tags, isMain } = req.body;
  const isValidInput = Z_Photo.safeParse(req.body);
  if (!files || !gameFowlMaterialsId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }));
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files });
      const values = {
        gameFowlMaterialsId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      };
      const newPhoto = new dbPhotos(values);
      const uploadedPhoto = await newPhoto.save();
      const updatePhotos = await dbGameFowlMaterials.findByIdAndUpdate(
        gameFowlMaterialsId,
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
