require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Substitua pela URL do seu frontend Next.js
  optionsSuccessStatus: 200, // alguns navegadores (como o IE11) precisam disso
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/employees', employeeRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
