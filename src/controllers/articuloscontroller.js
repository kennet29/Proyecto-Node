import { getConnection, querys, sql } from "../database";

export const getArticulos = async (req, res) => {
  try {
    res.render('articulos', {
      cssPaths: ['/css/estilo-footer.css', '/css/extras.css']
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllArticulos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllArticulos);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewArticulo = async (req, res) => {
  const { nombre, descripcion, estado, id_categoria, id_promocion } = req.body;

  // Validación
  if (!nombre || !descripcion || estado == null || !id_categoria || !id_promocion) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .input("estado", sql.Bit, estado)
      .input("id_categoria", sql.Int, id_categoria)
      .input("id_promocion", sql.Int, id_promocion)
      .query(querys.addNewArticulo);

    console.log("Nuevo registro de artículo creado:", { nombre, descripcion, estado });

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const deleteArticuloById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Codigo", req.params.id)
      .query(querys.deleteArticulo);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalArticulos = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getTotalArticulos);

    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateArticuloById = async (req, res) => {
  const { descripcion, nombre, estado, id_categoria, id_promocion } = req.body;

  // Validación
  if (!descripcion || !nombre || estado == null || !id_categoria || !id_promocion) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .input("estado", sql.Bit, estado)
      .input("id_categoria", sql.Int, id_categoria)
      .input("id_promocion", sql.Int, id_promocion)
      .input("codigo", req.params.id)
      .query(querys.updateArticuloById);

    console.log("Artículo actualizado:", { nombre, descripcion, estado });

    res.json({ nombre, descripcion, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
