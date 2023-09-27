import { getConnection, querys, sql } from "../database";

export const getPromociones = async (req, res) => {
  try {
    res.render('promociones.ejs',{
      cssPaths: ['/css/estilo-footer.css','/css/extras.css' ]
    });
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const getAllPromociones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllPromociones);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    // res.send(error.message);
  }
};

export const createNewPromocion = async (req, res) => {
  const { nombre, fechaInicio, fechaFinal, descuento, descripcion } = req.body;
  let { estado } = req.body;

  if (estado == null) estado = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("fechaInicio", sql.Date, fechaInicio)
      .input("fechaFinal", sql.Date, fechaFinal)
      .input("descuento", sql.Int, descuento)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .query(querys.addNewPromociones);

    res.json({ nombre, fechaInicio, fechaFinal, descuento, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};



export const deletePromocionById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("codigo", req.params.id)
      .query(querys.deletePromociones);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updatePromocionById = async (req, res) => {
  const { nombre, fechaInicio, fechaFinal, descuento, descripcion, estado } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar,  nombre)
      .input("fechaInicio", sql.Date, fechaInicio)
      .input("fechaFinal", sql.Date, fechaFinal)
      .input("descuento", sql.Int, descuento)
      .input("descripcion", sql.NVarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .input("codigo", req.params.id)
      .query(querys.updatePromocionesById);

    res.json({  nombre, fechaInicio, fechaFinal, descuento, descripcion, estado });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
