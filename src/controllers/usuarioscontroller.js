import { getConnection, querys, sql } from "../database";

// Function to render a user interface for listing users
export const getUsersPage = async (req, res) => {
  try {
    res.render('usuarios.ejs'); // Replace 'usuarios.ejs' with the correct name of your user view
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllUsers);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to create a new user
export const createNewUser = async (req, res) => {
  const { nombre, correo, contraseña, telefono, estado } = req.body;

  // Validating
  if (!nombre || !correo || !contraseña || !telefono) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("correo", sql.NVarChar, correo)
      .input("contraseña", sql.NVarChar, contraseña)
      .input("telefono", sql.Int, telefono)
      .input("estado", sql.Bit, estado)
      .query(querys.addNewUser);

    res.json({ nombre, correo, telefono, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to get a user by ID
export const getUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getUserById);

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteUser);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to update a user by ID
export const updateUserById = async (req, res) => {
  const { nombre, correo, telefono, estado } = req.body;

  // Validating
  if (!nombre || !correo || !telefono) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("correo", sql.NVarChar, correo)
      .input("telefono", sql.Int, telefono)
      .input("estado", sql.Bit, estado)
      .input("id", req.params.id)
      .query(querys.updateUserById);

    res.json({ nombre, correo, telefono, estado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
