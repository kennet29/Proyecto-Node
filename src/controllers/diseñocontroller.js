import { getConnection, querys, sql } from "../database";

export const getDiseños = async (req, res) => {
  try {
    res.render('disenos.ejs');
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const getAllDiseños = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllDiseños);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const createNewDiseño = async (req, res) => {
  const { nombre, descripcion } = req.body;
  let { estado } = req.body;

  // Validating
  if (descripcion == null || nombre == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (estado == null) estado = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Int, estado)
      .query(querys.addNewDiseños);

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDiseñoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.getDiseñosById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteDiseñoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deleteDiseños);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalDiseños = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalDiseños);
  res.json(result.recordset[0][""]);
};

export const updateDiseñoById = async (req, res) => {
  const { descripcion, nombre, estado } = req.body;

  // Validating
  if (!descripcion || !nombre || estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("descripcion", sql.Text, descripcion)
    .input("estado", sql.Int, estado)
    .input("codigo", req.params.id)
    .query(querys.updateDiseñosById);
    res.json({ nombre, descripcion, estado });
} catch (error) {
  res.status(500).send(error.message);
}
};
