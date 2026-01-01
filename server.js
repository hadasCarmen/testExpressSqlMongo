import express from 'express';
import dotenv from 'dotenv';
import { initSqlDb, getMysqlConnection } from './db/sql.js';
import { initMongoDb, getMongoDbConnection } from './db/mongodb.js';
import usersRoutes from './routers/users.js';
import messagesRoutes from './routers/messages.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

const startServer = async () => {
  await initSqlDb();
  await initMongoDb();


  app.use((req, res, next) => {
    req.mysqlConn = getMysqlConnection();
    req.mongoDbConn = getMongoDbConnection();
    next();
  });


  app.use('/', usersRoutes);
  app.use('/', messagesRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};


startServer();
