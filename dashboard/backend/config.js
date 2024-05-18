module.exports = {
    corsOptions: {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    },
    port: process.env.PORT || 3001,
    mongoURI: process.env.MONGODB_URI,
  };
  