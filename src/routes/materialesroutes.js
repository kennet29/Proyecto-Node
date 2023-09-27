import { Router } from "express";
import {
  getMateriales,
  getAllMateriales,
  createNewMaterial,
  getMaterialById,
  deleteMaterialById,
  updateMaterialById,
} from "../controllers/materialescontroller";

const router = Router();

router.get("/material", getMateriales);
router.get("/materiales", getAllMateriales);
router.post("/materiales", createNewMaterial);
router.get("/materiales/:id", getMaterialById);
router.delete("/materiales/:id", deleteMaterialById);
router.put("/materiales/:id", updateMaterialById);

export default router;