// index.js
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import path from 'path'


const app = express();
const port = 3001;

app.use(express.json());
// Configurar CORS para permitir solicitudes desde tu frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
  optionsSuccessStatus: 200 // Para navegadores más antiguos
};
app.use(cors(corsOptions));

// Middleware para las rutas
app.use('/api', routes);
app.use('/images', express.static(path.join('images')));

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
