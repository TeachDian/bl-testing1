import express from "express";
import {
  addGameFowlMaterials,
  addGameFowlMaterialsPhoto,
  deleteGameFowlMaterials,
  getAllGameFowlMaterials,
  getGameFowlMaterialsById,
  updateGameFowlMaterials,
} from "./services/gameFowlMaterials";
import { getBreederModule } from "./services/default";
import {
  addForBreeding,
  deleteBreedingPen,
  getBreedingPenById,
} from "./services/breedingPens";
const router = express.Router();

//new endpoint for getting gf material
router.get("/breeding-materials", getAllGameFowlMaterials);

router.get("/", getBreederModule);

// breeding materials
router.get(
  "/breeding-materials/:gameFowlMaterialsId",
  getGameFowlMaterialsById
);
router.post("/breeding-materials", addGameFowlMaterials);
router.patch(
  "/breeding-materials/:gameFowlMaterialsId",
  updateGameFowlMaterials
);
router.delete(
  "/breeding-materials/:gameFowlMaterialsId",
  deleteGameFowlMaterials
);
router.post(
  "breeding-materials/:gameFowlMaterialsId/photo",
  addGameFowlMaterialsPhoto
);

// breeding pens
router.get("/breeding-pens/:breedingPenId", getBreedingPenById);
router.post("/breeding-pens", addForBreeding);
router.delete("/breeding-pens/:breedingPenId", deleteBreedingPen);

export default router;
