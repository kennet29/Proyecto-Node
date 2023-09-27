import { Router } from "express";
import {
  getArticulos,
  getAllArticulos,
  createNewArticulo,

  deleteArticuloById,
  updateArticuloById,
} from "../controllers/articuloscontroller"; // Assuming the controller file is named "articuloscontroller.js"

const router = Router();

router.get("/articulo", getArticulos);
router.get("/articulos", getAllArticulos);
router.post("/articulos", createNewArticulo);

router.delete("/articulos/:id", deleteArticuloById);
router.put("/articulos/:id", updateArticuloById);

export default router;
