const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Llamamos las variables de entorno

require('dotenv').config();

// Crear el servidor de express

const app = express();

// CORS

app.use(cors());

// Base de Datos

dbConnection();

// Direcitorio público

app.use(express.static('public'));

// Lectura y parseo del body

/* Las peticiones que vengan en formato json
   las procesamos y extraemos su contenido
*/
app.use(express.json());

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todo'));

// Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`----> Servidor coriendo en puerto ${process.env.PORT}`);
});
