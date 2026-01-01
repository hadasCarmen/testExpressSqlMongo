import express from 'express';
import dotenv from 'dotenv';
import { initSqlDb, getMysqlConnection } from './db/sql.js';
import { initMongoDb, getMongoDbConnection } from './db/mongodb.js';
import usersRoutes from './routers/users.js';
import messagesRoutes from './routers/messages.js';

// products=mongodb=users.order=masages=sql

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Database Initialization
const startServer = async () => {
  await initSqlDb();
  await initMongoDb();


  // Middleware to attach database connections to the request object
  // This allows controllers to access db instances via req.mysqlConn and req.mongoDbConn
  app.use((req, res, next) => {
    req.mysqlConn = getMysqlConnection();
    req.mongoDbConn = getMongoDbConnection();
    next();
  });
  

  // Routes
  app.use('/', usersRoutes);
  app.use('/', messagesRoutes);

  // Global Error Handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


startServer();
