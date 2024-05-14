// index.js
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Middleware para las rutas
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
