import { getConnection, querys, sql } from "../database";

// Controlador para mostrar la página de inicio de sesión
export const getIndex = async (req, res) => {
  try {
    res.render('login', {
      cssPaths: ['/css/estilos-login.css'],
      imagePath: '/images/logo.jpg' // Ruta relativa a la carpeta "public"
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Controlador para el proceso de inicio de sesión
export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const pool = await getConnection();
    const userCredentials = await pool
      .request()
      .input('correo', sql.NVarChar(255), correo)
      .input('contraseña', sql.NVarChar(255), contraseña)
      .query(querys.getUserByCredentials);

    if (userCredentials.recordset.length > 0) {
      // Credenciales válidas, redirigir al usuario
      const cssPaths = ['/css/estilos.css', '/css/estilo-footer.css'];
      res.render('index', { cssPaths });
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      res.render('login', {
        cssPaths: ['/css/estilos-login.css'],
        error: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    // Manejar errores de manera adecuada
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};
