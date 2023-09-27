import {
  Router
} from "express";
import {
  getDiseños,
  getAllDiseños,
  createNewDiseño,
  getDiseñoById,
  deleteDiseñoById,
  getTotalDiseños,
  updateDiseñoById,
} from "../controllers/diseñocontroller";

const {
  json
} = require('express');

const router = Router();

router.get("/diseno", getDiseños);
router.get("/disenos", getAllDiseños);
router.post("/disenos", createNewDiseño);
router.get("/disenos/:id", getDiseñoById, );
router.delete("/disenos/:id", deleteDiseñoById);
router.put("/disenos/:id", updateDiseñoById)

export default router;