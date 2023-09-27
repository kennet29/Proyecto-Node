const sql = require('mssql');

// Configuración de conexión a SQL Server
const config = {
  server: 'DESKTOP-6VK5D6D',
  database: 'webstore',
  user: 'sa',
  password: '1234',
  options: {
    encrypt: false, // Si utilizas una conexión encriptada
  },
};

// Función para realizar una consulta a la base de datos
async function ejecutarConsulta() {
  try {
    // Conexión a la base de datos
    await sql.connect(config);

    // Consulta SQL
    const query = 'SELECT TOP(500) * FROM [webstore].[dbo].[Products]';

    // Ejecutar consulta
    const result = await sql.query(query);

    // Imprimir resultados
    console.log(result.recordset);
  } catch (error) {
    console.error('Error al ejecutar consulta:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
}

// Ejecutar la función
ejecutarConsulta();