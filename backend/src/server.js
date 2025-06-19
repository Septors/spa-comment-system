import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server started in PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("Server error", err);
  }
};

start();
