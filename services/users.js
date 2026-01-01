
import { ObjectId } from 'mongodb';

export const createUser = async (db, userData) => {
  const user = {
    ...userData,
    username: userData.username,
    password: userData.password,
    encryptedMessagesCount:0,
    updatedAt: new Date()
  };

  try {
    const result = await db.collection('users').insertOne(user);
    return { ...user, id: result.insertedId };
  } catch (error) {
    // Handle MongoDB duplicate key error (code 11000) for unique fields (e.g., name)
    if (error.code === 11000) {
      throw new Error('user with this name already exists');
    }
    throw error;
  }
};