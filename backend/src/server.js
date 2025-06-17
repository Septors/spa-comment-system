import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connectDB.js";

dotenv.config();

const PORT = env.process.PORT || 5000;

const start = async () => {
  connectDb;

  app.listen(PORT, () => {
    console.log(`Server started in PORT: ${PORT}`);
  });
};

start();
