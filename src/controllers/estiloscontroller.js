import { getConnection, querys, sql } from "../database";

export const getEstilos = async (req, res) => {
  try {
    res.render('estilos', {
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllEstilos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllEstilos);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const createNewEstilo = async (req, res) => {
  const { nombre, descripcion } = req.body;
  let { estado } = req.body;

  // Validating
  if (!nombre || !descripcion) {
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
      .query(querys.addNewEstilos);

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getEstiloById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getProducById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteEstiloById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteEstilos);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalEstilos = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalEstilos);
  console.log(result);
  res.json(result.recordset[0][""]);
};

export const updateEstiloById = async (req, res) => {
  const { descripcion, nombre, estado } = req.body;

  // Validating
  if (descripcion == null || nombre == null || estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Int, estado)
      .input("codigo", req.params.id)
      .query(querys.updateEstilosById);
    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
}
};