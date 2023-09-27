import { Router } from "express";
import {
  getPromociones,
  getAllPromociones,
  createNewPromocion,
  deletePromocionById,
  updatePromocionById,
} from "../controllers/promocionescontroller";

const { json } = require('express');

const router = Router();

router.get("/promocion", getPromociones);
router.get("/promociones", getAllPromociones);
router.post("/promociones", createNewPromocion);
router.delete("/promociones/:id", deletePromocionById);
router.put("/promociones/:id", updatePromocionById);

export default router;
