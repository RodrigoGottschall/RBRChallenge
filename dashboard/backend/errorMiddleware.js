const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro completo
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Garante que o status code seja 500 se não definido
    res.status(statusCode).json({ error: err.message || 'Erro interno do servidor' });
  };
  
  module.exports = errorHandler;
  