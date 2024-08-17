import mongoose, { Connection } from "mongoose";

let connection: Connection | null = null;

export const connectDB = async () => {
  if (connection) {
    console.log("DB is already connected ✅");
    return;
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
