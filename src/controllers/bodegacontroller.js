import { query } from "express";
import { getConnection, querys, sql } from "../database";

export const getBodega = async (req, res) => {
  try {
    // Aquí puedes renderizar la vista correspondiente si es necesario
    // y definir las rutas CSS, similar a como lo hiciste en el controlador original.
    res.render('bodegas.ejs', {
      cssPaths: ['/css/estilos.css', '/css/estilo-footer.css']
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllBodega = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllBodega);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewBodega = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validación
  if (!nombre || estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide nombre and estado" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .query(querys.addNewBodega);

    console.log("Nuevo registro creado:", { nombre, descripcion, estado });

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBodegaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.getBodegaById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteBodegaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deleteBodega);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalBodegas = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalBodega);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateBodegaById = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validating
  if (nombre == null || descripcion == null || estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .input("codigo", req.params.id)
      .query(querys.updateBodegaById);

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
