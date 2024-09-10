import express from "express";
import {
  addBreedingSeason,
  deleteBreedingSeason,
  getBreedingSeasonById,
  updateBreedingSeason,
} from "./services/breeding-season";
import {
  addGameFowlClass,
  deleteGameFowlClass,
  getGameFowlClassById,
  updateGameFowlClass,
} from "./services/gameFowlClass";
import {
  addGameFowlType,
  deleteGameFowlType,
  getGameFowlTypeById,
  updateGameFowlType,
} from "./services/gameFowlType";
import {
  addGameFowlBodyColor,
  deleteGameFowlBodyColor,
  getGameFowlBodyColorById,
  updateGameFowlBodyColor,
} from "./services/gameFowlBodyColor";
import {
  addGameFowlGender,
  deleteGameFowlGender,
  getGameFowlGenderById,
  updateGameFowlGender,
} from "./services/gameFowlGender";
import {
  addGameFowlLegColor,
  deleteGameFowlLegColor,
  getGameFowlLegColorById,
  updateGameFowlLegColor,
} from "./services/gameFowlLegColor";
import {
  addGameFowlSkillsCategory,
  deleteGameFowlSkillsCategory,
  getGameFowlSkillsCategoryById,
  updateGameFowlSkillsCategory,
} from "./services/gameFowlSkillsCategory";
import {
  addGameFowlSkills,
  deleteGameFowlSkills,
  getGameFowlSkillsById,
  updateGameFowlSkills,
} from "./services/gameFowlSkills";
import {
  addGameFowlStatus,
  deleteGameFowlStatus,
  getGameFowlStatusById,
  updateGameFowlStatus,
} from "./services/gameFowlStatus";
import {
  addGameFowlTraitsCategory,
  deleteGameFowlTraitsCategory,
  getGameFowlTraitsCategory,
  updateGameFowlTraitsCategory,
} from "./services/gameFowlTraitsCategory";
import {
  addGameFowlTraits,
  deleteGameFowlTraits,
  getGameFowlTraitsById,
  updateGameFowlTraits,
} from "./services/gameFowlTraits";
import {
  addGameFowlFederation,
  deleteGameFowlFederation,
  getGameFowlFederationById,
  updateGameFowlFederation,
} from "./services/gameFowlFederation";
import {
  addGameGameFowlLocalAssociation,
  deleteGameFowlLocalAssociation,
  getGameFowlLocalAssociationById,
  updateGameFowlLocalAssociation,
} from "./services/gameFowlLocalAssociation";
import { getBreederSettings } from "./services/default";
import {
  addGameFowlComb,
  deleteGameFowlComb,
  getGameFowlCombById,
  updateGameFowlComb,
} from "./services/gameFowlComb";

const router = express.Router();

// Breeder Settings
router.get("/", getBreederSettings);

// Breeding Season
router.get("/breeding-season/:seasonId", getBreedingSeasonById);
router.post("/breeding-season", addBreedingSeason);
router.patch("/breeding-season/:seasonId", updateBreedingSeason);
router.delete("/breeding-season/:seasonId", deleteBreedingSeason);

// Class
router.get("/class/:classId", getGameFowlClassById);
router.post("/class", addGameFowlClass);
router.patch("/class/:classId", updateGameFowlClass);
router.delete("/class/:classId", deleteGameFowlClass);

// Type
router.get("/type/:typeId", getGameFowlTypeById);
router.post("/type", addGameFowlType);
router.patch("/type/:typeId", updateGameFowlType);
router.delete("/type/:typeId", deleteGameFowlType);

// Body Color
router.get("/body-color/:bodyColorId", getGameFowlBodyColorById);
router.post("/body-color", addGameFowlBodyColor);
router.patch("/body-color/:bodyColorId", updateGameFowlBodyColor);
router.delete("/body-color/:bodyColorId", deleteGameFowlBodyColor);

// Gender
router.get("/gender/:genderId", getGameFowlGenderById);
router.post("/gender", addGameFowlGender);
router.patch("/gender/:genderId", updateGameFowlGender);
router.delete("/gender/:genderId", deleteGameFowlGender);

// Leg Color
router.get("/leg-color/:legColorId", getGameFowlLegColorById);
router.post("/leg-color", addGameFowlLegColor);
router.patch("/leg-color/:legColorId", updateGameFowlLegColor);
router.delete("/leg-color/:legColorId", deleteGameFowlLegColor);

// Skills Category
router.get("/skills-category/:skillsCategoryId", getGameFowlSkillsCategoryById);
router.post("/skills-category", addGameFowlSkillsCategory);
router.patch(
  "/skills-category/:skillsCategoryId",
  updateGameFowlSkillsCategory
);
router.delete(
  "/skills-category/:skillsCategoryId",
  deleteGameFowlSkillsCategory
);

// Skills
router.get("/skills/:skillsId", getGameFowlSkillsById);
router.post("/skills", addGameFowlSkills);
router.patch("/skills/:skillsId", updateGameFowlSkills);
router.delete("/skills/:skillsId", deleteGameFowlSkills);

// Status
router.get("/status/:statusId", getGameFowlStatusById);
router.post("/status", addGameFowlStatus);
router.patch("/status/:statusId", updateGameFowlStatus);
router.delete("/status/:statusId", deleteGameFowlStatus);

// Traits Category
router.get("/traits-category/:traitsCategoryId", getGameFowlTraitsCategory);
router.post("/traits-category", addGameFowlTraitsCategory);
router.patch(
  "/traits-category/:traitsCategoryId",
  updateGameFowlTraitsCategory
);
router.delete(
  "/traits-category/:traitsCategoryId",
  deleteGameFowlTraitsCategory
);

// Traits
router.get("/traits/:traitsId", getGameFowlTraitsById);
router.post("/traits", addGameFowlTraits);
router.patch("/traits/:traitsId", updateGameFowlTraits);
router.delete("/traits/:traitsId", deleteGameFowlTraits);

// Federation
router.get("/federation/:federationId", getGameFowlFederationById);
router.post("/federation", addGameFowlFederation);
router.patch("/federation/:federationId", updateGameFowlFederation);
router.delete("/federation/:federationId", deleteGameFowlFederation);

// Local Association
router.get(
  "/local-association/:associationId",
  getGameFowlLocalAssociationById
);
router.post("/local-association", addGameGameFowlLocalAssociation);
router.patch(
  "/local-association/:associationId",
  updateGameFowlLocalAssociation
);
router.delete(
  "/local-association/:associationId",
  deleteGameFowlLocalAssociation
);

// Comb
router.get("/comb/:combId", getGameFowlCombById);
router.post("/comb", addGameFowlComb);
router.patch("/comb/:combId", updateGameFowlComb);
router.delete("/comb/:combId", deleteGameFowlComb);

export default router;
