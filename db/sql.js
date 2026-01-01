import mysql from 'mysql2/promise';

let connection;

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
};

export const initSqlDb = async () => {
  try {
    // First connect without specifying a database to check if it exists or create it
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Checking MySQL database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS messages`);
    console.log('MySQL database checked/created.');

    // Close the initial connection and reconnect with the 'messages' database selected
    await connection.end();
    connection = await mysql.createConnection({
      ...dbConfig,
      database: 'messages'
    });

    console.log('Checking MySQL tables...');
    // Create 'messages' table if it doesn't exist to ensure schema readiness
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        cipher_type VARCHAR(24) NOT NULL,
        encrypted_text VARCHAR(24) NOT NULL,
        inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);
    console.log('MySQL messages table ready.');
    
  } catch (error) {
    console.error('MySQL Initialization Error:', error);
    process.exit(1);
  }
};

export const getMysqlConnection = () => {
  if (!connection) {
    throw new Error('MySQL connection not initialized. Call initSqlDb() first.');
  }
  return connection;
};
