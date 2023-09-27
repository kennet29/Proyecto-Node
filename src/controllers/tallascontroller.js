import { getConnection, querys, sql } from "../database";

export const getTallas = async (req, res) => {
  try {
    res.render('tallas.ejs',{
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const getAllTallas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllTallas);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const createNewTalla = async (req, res) => {
  const { nombre, descripcion } = req.body;
  let { estado } = req.body;

  // Validating
  if (nombre == null || descripcion == null) {
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
      .query(querys.addNewTallas);

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTallaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getTallasById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteTallaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deleteTallas);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateTallaById = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validating
  

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Int, estado)
      .input("codigo", req.params.id)
      .query(querys.updateTallasById);

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
