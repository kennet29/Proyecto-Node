import { Router } from "express";
import {
  getCategorias,
  getAllCategorias,
  createNewCategorias,
  getCategoriasById,
  deleteCategoriasById,
  updateCategoriasById,
} from "../controllers/categoriascontroller";

const router = Router();

router.get("/categoria",getCategorias);
router.get("/categorias", getAllCategorias);
router.post("/categorias", createNewCategorias);
router.get("/categorias/:id", getCategoriasById);
router.delete("/categorias/:id", deleteCategoriasById);
router.put("/categorias/:id", updateCategoriasById);

export default router;
