import { getConnection, querys, sql } from "../database";
export const getCategorias = async (req, res) => {
  try {
    res.render('categorias', {
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllCategorias = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllCategoria);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewCategorias = async (req, res) => {
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
      .query(querys.addNewCategoria);

    // Cambiar "color" a "nombre"

    res.json({ nombre, descripcion, estado }); // Cambiar "color" a "nombre"
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getCategoriasById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Id", req.params.id)
      .query(querys.getCategoriaById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCategoriasById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Codigo", req.params.id)
      .query(querys.deleteCategoria);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalCategorias = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(querys.getAllCategoria);
    console.log(result);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCategoriasById = async (req, res) => {
  const { descripcion, nombre, estado } = req.body;

  // Validación
 

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .input("estado", sql.Int, estado)
      .input("codigo", req.params.id)
      .query(querys.updateCategoriaById);
      
    res.json({ nombre, descripcion, estado });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};