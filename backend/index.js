import express from 'express';
import sequelize from './models/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
const app = express ();
dotenv.config ();

app.use (cors ());
app.use (express.json ());
app.use (express.urlencoded ({extended: true}));

// Rutas
app.use ('/auth', authRoutes);
app.use ('/pokemon', pokemonRoutes);
app.use ('/sales', salesRoutes);

import './models/associations.js';

/**
 * Verifica la conexión con la base de datos PostgreSQL.
 * Si la conexión es exitosa, se sincronizan los modelos con la base de datos.
 * Si no se puede conectar a la base de datos, se muestra por consola el mensaje de error.
 * @returns {Promise<void>}
 */

async function testDatabaseConnection () {
  try {
    await sequelize.authenticate ();
    sequelize.sync ();
    console.log ('Conectado a la base de datos PostgreSQL con Sequelize');
  } catch (error) {
    console.error (
      'Error conectando a la base de datos PostgreSQL:',
      error.message
    );
  }
}

testDatabaseConnection ();

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
  console.log (`Servidor escuchando en el puerto ${PORT}`);
});
