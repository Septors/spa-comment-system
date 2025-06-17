import prisma from "../lib/prisma.js";

const connectDb = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;
