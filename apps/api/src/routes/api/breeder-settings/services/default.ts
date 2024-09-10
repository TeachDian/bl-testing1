import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/services/response";
import dbBreederSettings from "@/models/dbBreederSettings";
import { Request, Response } from "express";

const response = new ResponseService();

export const getBreederSettings = async (req: Request, res: Response) => {
  try {
    const breederSettings = await dbBreederSettings
      .find({ deletedAt: null })
      .populate("breedingSeason")
      .populate("gameFowlClass")
      .populate("gameFowlType")
      .populate("gamFowlBodyColor")
      .populate("gameFowlGender")
      .populate("gameFowlLegColor")
      .populate("gameFowlSkillsCategory")
      .populate("gameFowlSkills")
      .populate("gameFowlStatus")
      .populate("gameFowlTraitsCategory")
      .populate("gameFowlTraits")
      .populate("gameFowlFederation")
      .populate("gameFowlLocalAssociation")
      .populate("gameFowlComb");

    const filteredBreederSettings = breederSettings.reverse();
    res.json(
      response.success({
        items: filteredBreederSettings,
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
