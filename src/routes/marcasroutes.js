import { Router } from "express";
import {
 getMarcas,
  getAllMarcas,
  createNewMarca,
  getMarcaById,
  deleteMarcaById,
  getTotalMarcas,
  updateMarcaById,
} from "../controllers/marcascontroller";

const { json } = require('express');

const router = Router();

router.get("/marca",getMarcas);

router.get("/marcas", getAllMarcas);

router.post("/marcas", createNewMarca);

router.get("/marcas/count", getTotalMarcas);

router.get("/marcas/:id",getMarcaById);

router.delete("/marcas/:id", deleteMarcaById);

router.put("/marcas/:id", updateMarcaById);

export default router;
