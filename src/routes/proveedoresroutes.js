import { Router } from "express";
import {
  getProveedores,
  getAllProveedores,
  createNewProveedor,
  getProveedorById,
  deleteProveedorById,
  updateProveedorById,
} from "../controllers/proveedorescontroller";

const { json } = require('express');

const router = Router();

router.get("/proveedor", getProveedores);

router.get("/proveedores", getAllProveedores);

router.post("/proveedores", createNewProveedor);

router.get("/proveedores/:id", getProveedorById);

router.delete("/proveedores/:id", deleteProveedorById);

router.put("/proveedores/:id", updateProveedorById);

export default router;
