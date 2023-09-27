import { Router } from "express";
import {
  getTallas,
  getAllTallas,
  createNewTalla,
  getTallaById,
  deleteTallaById,
  updateTallaById,
} from "../controllers/tallascontroller";

const { json } = require('express');

const router = Router();

router.get("/talla", getTallas);

router.get("/tallas", getAllTallas);

router.post("/tallas", createNewTalla);

router.get("/tallas/:id", getTallaById,);

router.delete("/tallas/:id",deleteTallaById);

router.put("/tallas/:id", updateTallaById)

export default router;
