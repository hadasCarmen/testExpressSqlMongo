
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
    if (error.code === 11000) {
      throw new Error('user with this name already exists');
    }
    throw error;
  }
};
export const myProfile = async (db, userData) => {
  // const user = {
  //   ...userData,
  //   username: userData.username,
  //   password: userData.password,
  //   encryptedMessagesCount:0,
  //   updatedAt: new Date()
  // };

  try {
    // const result = await db.collection('users').insertOne(user);
    const user = await db.collection('users').findOne({username: userData.username });
    return { ...user};
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('user with this name already exists');
    }
    throw error;
  }
};