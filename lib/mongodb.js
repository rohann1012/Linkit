
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('MongoDB URI not found. Please check your environment variables.')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
}

async function createMongoClient() {
  try {
    console.log('Initializing MongoDB connection...');
    const client = new MongoClient(uri, options);
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB connection established');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createMongoClient()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = createMongoClient()
}

export default clientPromise
