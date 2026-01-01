import { ObjectId } from "mongodb";

export const encryptMessage = async (mysqlConn, mongoDb, messageData) => {
  const { password, username, cipher_type, message } = messageData;

  const user = await mongoDb
    .collection("users")
    .findOne({ username: username });
  if (!user) {
    throw new Error("user not found");
  }

  if ((user.username === username, user.password === password)) {
    let encrypted_text = "";
    for (let i = message.length - 1; i >= 0; i--) {
      encrypted_text += message[i];
    }

    const [result] = await mysqlConn.query(
      "INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ?)",
      [username, cipher_type, encrypted_text]
    );

    await mongoDb
      .collection("users")
      .updateOne(
        { _id: new ObjectId(user._id) },
        { $inc: { encryptedMessagesCount: 1 } }
      );

    return {
      id: result.id,
      username,
      cipher_type,
      encrypted_text,
      inserted_at: new Date(),
    };
  } else {
    throw new Error("user/password not good");
  }
};

export const decryptMessage = async (mysqlConn, mongoDb, messageData) => {
  const { password, username, messageId } = messageData;

  const user = await mongoDb
    .collection("users")
    .findOne({ username: username });
  if (!user) {
    throw new Error("user not found");
  }
  const message1 = await mysqlConn.execute(
    "SELECT * FROM messages WHERE id = ?",
    [messageId]
  );

  if ((user.username === username, user.password === password)) {
    let message = "";
    for (let i = message1[0][0].encrypted_text.length - 1; i >= 0; i--) {
      message += message1[0][0].encrypted_text[i];
    }

    return {
      id: user._id,
      message,
    };
  } else {
    throw new Error("user/password not good");
  }
};
