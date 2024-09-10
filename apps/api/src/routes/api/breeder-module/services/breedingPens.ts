import {
  RECORD_DOES_NOT_EXIST,
  UNKNOWN_ERROR_OCCURRED,
} from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreedingPens from "@/models/dbBreedingPens";
import dbGameFowlMaterials from "@/models/dbGameFowlMaterials";
import { T_Breeding_Pens } from "@repo/contract";
import { Request, Response } from "express";
import { convertToFraction } from "../helpers/ConvertToFraction";
import dbBreederModule from "@/models/dbBreederModule";
import dbBreedingSeason from "@/models/dbBreedingSeason";

const response = new ResponseService();

export const getBreedingPenById = async (req: Request, res: Response) => {
  const breedingPenId = req.params.breedingPenId;
  try {
    const breedingPen = await dbBreedingPens
      .findById(breedingPenId)
      .populate("breedingSeason")
      .populate({
        path: "forBreeding",
        populate: [{ path: "broodCock" }, { path: "broodHen" }],
      });

    if (!breedingPen) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }
    res.json(response.success({ item: breedingPen }));
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};

export const addForBreeding = async (req: Request, res: Response) => {
  const {
    breedingSeason,
    breedingDate,
    breedingPen,
    forBreeding,
    offspringMarkings,
  }: T_Breeding_Pens = req.body;

  try {
    if (breedingSeason) {
      const existingBreedingSeason =
        await dbBreedingSeason.findById(breedingSeason);

      if (!existingBreedingSeason) {
        return res.json(
          response.error({
            message: "Invalid BreedingSeason!",
          })
        );
      }
    }

    const newForBreeding = new dbBreedingPens({
      breedingSeason: breedingSeason || undefined,
      breedingDate,
      breedingPen,
      forBreeding,
      offspringMarkings,
    });

    const savedBreedingPen = await newForBreeding.save();

    let breederModule = await dbBreederModule.findOne();
    if (breederModule) {
      await dbBreederModule.findByIdAndUpdate(
        breederModule._id,
        {
          $push: { breedingPens: savedBreedingPen._id },
          $set: { updatedAt: new Date() },
        },
        { new: true }
      );
    } else {
      await new dbBreederModule({
        breedingPens: [savedBreedingPen._id],
      }).save();
    }

    res.json(
      response.success({
        item: savedBreedingPen,
        message: "Breeding process successfully saved!",
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

export const deleteBreedingPen = async (req: Request, res: Response) => {
  const breedingPenId = req.params.breedingPenId;
  try {
    const deleteBreedingPen = await dbBreedingPens.findById(breedingPenId);
    if (!deleteBreedingPen) {
      return res.json(
        response.error({
          message: RECORD_DOES_NOT_EXIST,
        })
      );
    }

    await dbBreedingPens.findByIdAndDelete(breedingPenId);

    res.json(
      response.success({
        item: deleteBreedingPen,
        message: "Breeding pen successfully deleted!",
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
