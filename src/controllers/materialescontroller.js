import { getConnection, querys, sql } from "../database";

export const getMateriales = async (req, res) => {
  try {
    res.render('materiales.ejs', {
      cssPaths: ['/css/estilos.css', '/css/estilo-footer.css']
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllMateriales = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllMateriales);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewMaterial = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validation
  if (!nombre) {
    return res.status(400).json({ msg: "Bad Request. Please provide a nombre" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .query(querys.addNewMateriales);

    console.log("Nuevo registro creado:", { nombre, descripcion, estado });

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMaterialById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.getMaterialesById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteMaterialById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deleteMateriales);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalMateriales = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalMateriales);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMaterialById = async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validation
  if (!nombre || estado == null) {
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
      .query(querys.updateMaterialesById);

   
    res.json({ nombre, descripcion, estado });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
