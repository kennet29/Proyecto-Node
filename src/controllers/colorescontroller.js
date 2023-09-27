 import { getConnection, querys, sql } from "../database";
export const getColores = async (req, res) => {
  try {
    res.render('colores', {
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllColores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllColor);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewColor = async (req, res) => {
  const { nombre, descripcion } = req.body; // Cambiar "color" a "nombre"
  let { estado } = req.body;

  // Validación
  if (!nombre) {
    return res.status(400).json({ msg: "Bad Request. Please provide a nombre" });
  }

  if (estado == null) estado = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.VarChar, nombre) // Cambiar "color" a "nombre"
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .query(querys.addNewColor);

    console.log("Nuevo registro creado:", { nombre, descripcion, estado }); // Cambiar "color" a "nombre"

    res.json({ nombre, descripcion, estado }); // Cambiar "color" a "nombre"
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getColorById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Id", req.params.id)
      .query(querys.getColoresById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteColorById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Codigo", req.params.id)
      .query(querys.deleteColor);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalColors = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalColor);
    console.log(result);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateColorById = async (req, res) => {
  const { descripcion, nombre, estado } = req.body;

  // Validación
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
      .query(querys.updateColorById);
      console.log("nombre: " + nombre);
    res.json({ nombre, descripcion, estado });
    console.log("nombre: " + nombre);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
