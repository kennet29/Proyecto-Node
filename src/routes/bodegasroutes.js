import { Router } from "express";
import {
  getBodega,
  getAllBodega,
  createNewBodega,
  getBodegaById,
  deleteBodegaById,
  updateBodegaById,
} from "../controllers/bodegacontroller"; // Asegúrate de importar el controlador correcto

const router = Router();

router.get("/bodega", getBodega); // Cambia "/categoria" a "/bodega" y "getCategorias" a "getBodega"
router.get("/bodegas", getAllBodega); // Cambia "/categorias" a "/bodegas" y "getAllCategorias" a "getAllBodega"
router.post("/bodegas", createNewBodega); // Cambia "/categorias" a "/bodegas" y "createNewCategorias" a "createNewBodega"
router.get("/bodegas/:id", getBodegaById); // Cambia "/categorias/:id" a "/bodegas/:id" y "getCategoriasById" a "getBodegaById"
router.delete("/bodegas/:id", deleteBodegaById); // Cambia "/categorias/:id" a "/bodegas/:id" y "deleteCategoriasById" a "deleteBodegaById"
router.put("/bodegas/:id", updateBodegaById); // Cambia "/categorias/:id" a "/bodegas/:id" y "updateCategoriasById" a "updateBodegaById"

export default router;
