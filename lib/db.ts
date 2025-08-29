import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in env variables");
}

type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: CachedMongoose = (global as { mongoose?: CachedMongoose }).mongoose as CachedMongoose;

if (!cached) {
  cached = (global as typeof globalThis).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // better for serverless
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
