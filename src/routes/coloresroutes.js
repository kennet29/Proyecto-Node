import { Router } from "express";
import {
  getColores,
  getAllColores,
  createNewColor,
  getColorById,
  deleteColorById,
  updateColorById,
} from "../controllers/colorescontroller";

const router = Router();

router.get("/color", getColores);
router.get("/colores", getAllColores);
router.post("/colores", createNewColor);
router.get("/colores/:id", getColorById);
router.delete("/colores/:id", deleteColorById);
router.put("/colores/:id", updateColorById);

export default router;
