import { getConnection, querys, sql } from "../database";

export const getProveedores = async (req, res) => {
  try {
    res.render('proveedores.ejs',{
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const getAllProveedores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProveedores);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const createNewProveedor = async (req, res) => {
  const { nombre, direccion, telefono, correo, descripcion } = req.body;
  let { estado } = req.body;

  // Validating
  if (nombre == null || direccion == null || telefono == null || correo == null || descripcion == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (estado == null) estado = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("direccion", sql.NVarChar, direccion)
      .input("telefono", sql.Int, telefono)
      .input("correo", sql.NVarChar, correo)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Int, estado)
      .query(querys.addNewProveedores);

    res.json({ nombre, direccion, telefono, correo, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProveedorById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getProveedoresById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProveedorById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deleteProveedores);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateProveedorById = async (req, res) => {
  const { nombre, direccion, telefono, correo, descripcion, estado } = req.body;


  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("direccion", sql.NVarChar, direccion)
      .input("telefono", sql.Int, telefono)
      .input("correo", sql.NVarChar, correo)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Int, estado)
      .input("codigo", req.params.id)
      
      .query(querys.updateProveedoresById);

      res.json({ nombre, direccion, telefono, correo, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
