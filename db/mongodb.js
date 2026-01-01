import { MongoClient } from 'mongodb';

const mongoUrl = process.env.MONGO_URI;
const dbName = 'users';

let client;
let db;

export const initMongoDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(mongoUrl);
    await client.connect();
    
    db = client.db(dbName);
    console.log('Connected to MongoDB.');

    console.log('creating indexes...');
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ username: 1 }, { unique: true });
    console.log('MongoDB indexes ready.');

  } catch (error) {
    console.error('MongoDB Initialization Error:', error);
    process.exit(1);
  }
};

export const getMongoDbConnection = () => {
  if (!db) {
    throw new Error('MongoDB not initialized. Call initMongoDb() first.');
  }
  return db;
};

