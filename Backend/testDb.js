const db = require('./config/db');

async function probarConexion() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión OK. Resultado:', rows[0].resultado);
    process.exit(0);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

probarConexion();
