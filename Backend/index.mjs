import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import path from 'path';

const app = express();
const port = 3001;

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://admin.animeplay.play:3000',
  'http://animeplay.play:3000',
  'https://animeplay.play:3000',
  'https://animeplay.play:'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Middleware para las rutas
app.use('/api', routes);
app.use('/images', express.static(path.join('images')));

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Hola, estás en el backend');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
