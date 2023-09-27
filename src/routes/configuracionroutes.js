import { Router } from "express";
import {
  getAllConfiguraciones,
  getConfiguracion,
  updateConfiguracion,
} from "../controllers/configuracioncontroller"; // Asegúrate de importar los controladores correctos

const router = Router();
router.get("/configuracion",getConfiguracion);
router.get("/configuraciones", getAllConfiguraciones);
router.put("/configuraciones/:id", updateConfiguracion);

export default router;
