import mongoose from "mongoose";

type connectionObj = {
  isConnected?: number;
};

const connection: connectionObj = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log("DB is already connected ✅");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI! || ""
    );
    connection.isConnected = connectionInstance.connections[0].readyState;
    console.log("DB connected Successfully 🚀🚀");
  } catch (error) {
    console.error("Database connection failed 🎆:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
};
