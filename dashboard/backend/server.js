require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const errorHandler = require('./errorMiddleware');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use(errorHandler); // Use o middleware de erro

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');

    app.listen(config.port, () => {
      console.log(`Servidor rodando em http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB ou iniciar o servidor:', error);
    process.exit(1); 
  }
};

startServer();
