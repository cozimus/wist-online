const corsOptions = {
  origin: ["http://localhost:3000", "https://wist-online.onrender.com"],
  credentials: true,
  optionSuccessStatus: 200,
};

const serverOptions = {
  cors: corsOptions,
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
};

export { serverOptions, corsOptions };
