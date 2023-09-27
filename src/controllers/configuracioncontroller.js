import { getConnection, querys, sql } from "../database";

export const getConfiguracion = async (req, res) => {
  try {
    res.render('configuraciones', { 
      cssPaths: ['/css/estilo-footer.css','/css/extras.css','/css/estilosconfig.css' ]
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllConfiguraciones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getConfiguracion);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateConfiguracion = async (req, res) => {
  const { direccion, correoElectronico, telefono1, telefono2, eslogan, tipoDeCambio } = req.body;

  // Validación
  if (!direccion || !correoElectronico || telefono1 == null || telefono2 == null || !eslogan || tipoDeCambio == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const Id = 1; // El ID del registro que deseas actualizar (en este caso, 1)

    await pool
      .request()
      .input("Id", sql.Int, Id)
      .input("direccion", sql.Text, direccion)
      .input("correoElectronico", sql.Text, correoElectronico)
      .input("telefono1", sql.BigInt, telefono1)
      .input("telefono2", sql.BigInt, telefono2)
      .input("eslogan", sql.Text, eslogan)
      .input("tipoDeCambio", sql.Money, tipoDeCambio)
      .input("nombreNegocio", req.params.nombreNegocio)
      .query(querys.UpdateConfig);

    res.json({
      Id,
      direccion,
      correoElectronico,
      telefono1,
      telefono2,
      eslogan,
      tipoDeCambio,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};