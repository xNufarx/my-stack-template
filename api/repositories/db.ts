import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL || ''

/**
 * Connect to the mongoDb instance
 */
export const connectDb = async (): Promise<void> => {
  return mongoose
    .connect(MONGODB_URL)
    .then(() => console.log(`✅ Connection to ${MONGODB_URL} successfull`))
}
