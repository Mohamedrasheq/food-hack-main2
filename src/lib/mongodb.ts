import mongoose from 'mongoose'

// Add this type declaration
declare global {
  var mongoose: { conn: any; promise: any } | undefined
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local')
}

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  const mongooseCache = cached as { conn: any; promise: any }
  
  if (mongooseCache.conn) {
    return mongooseCache.conn
  }

  if (!mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    }

    mongooseCache.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    mongooseCache.conn = await mongooseCache.promise
  } catch (e) {
    mongooseCache.promise = null
    throw e
  }

  return mongooseCache.conn
}

export default dbConnect ;