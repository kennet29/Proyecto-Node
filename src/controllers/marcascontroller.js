import { getConnection, querys, sql } from "../database";

export const getMarcas = async (req, res) => {
  try {
    res.render('marcas.ejs', {
      cssPaths: ['/css/estilos.css', '/css/estilo-footer.css']
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllMarcas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllMarcas);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewMarca = async (req, res) => {
  const { nombre, descripcion } = req.body;
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
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Int, estado)
      .query(querys.addNewMarcas);

    console.log("Nueva marca creada:", { nombre, descripcion, estado });

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMarcaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Id", req.params.id)
      .query(querys.getMarcaById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteMarcaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Codigo", req.params.id)
      .query(querys.deleteMarcas);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalMarcas = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalMarca);
    console.log(result);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMarcaById = async (req, res) => {
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
      .query(querys.updateMarcasById);
 

    res.json({ nombre, descripcion, estado });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
