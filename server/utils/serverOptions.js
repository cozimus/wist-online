const serverOptions = {
  cors: {
    // origin: ["http://localhost:3000", "https://wist-online.onrender.com"],
    origin: "*",
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
};

export default serverOptions;
