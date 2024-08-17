import mongoose, { Connection } from "mongoose";

let connection: Connection | null = null;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

export const connectDB = async () => {
  if (connection) {
    console.log("DB is already connected ✅");
    return connection;
  }

  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI! || ""
    );
    connection = connectionInstance.connection;
    console.log("DB connected Successfully 🚀🚀");
  } catch (error) {
    console.error("Database connection failed 🎆:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
};
