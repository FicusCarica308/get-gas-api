import express, {Application, NextFunction, Request, Response} from 'express';
import path from 'path';
import mongoose, { Connection } from 'mongoose';
import { connectDB } from '../DB-Engine/mongo_setup';

/*Routers*/
import { specsRouter } from './routes/specs';
/*==================================================*/

/* App setup */
const app: Application = express();
const PORT = process.env.PORT || 5555;
/*==================================================*/


/* Mongoose setup */
app.locals.DBisConnected = false;

connectDB({ DBisConnected: app.locals.DBisConnected, wasVerification: false })
  .then((result: Boolean) => {
    app.locals.DBisConnected = result;
  });

const DB: Connection = mongoose.connection;

DB.on('error', (err: Error) => {
  console.error('get-gas-api-cluster Database (Error Connecting) - ', err.message)
  app.locals.DBisConnected = false;
});

DB.on('reconnectFailed', (err: Error) => {
  console.error('get-gas-api-cluster Database (Cannot Reconnect) - ', err)
  app.locals.DBisConnected = false;
});

DB.on('disconnected', (err: Error) => {
  console.error('get-gas-api-cluster Database (Disconnected) - ', err)
  app.locals.DBisConnected = false;
});
/*==================================================*/

/* API Homepage */
app.get('/', (req: Request, res: Response) => {
    DB.close();
    res.status(200).sendFile(path.join(__dirname + '/views/index.html'));
});
/*==================================================*/

/* use for '/specs' route and router */
app.use('/specs', specsRouter);
/*==================================================*/

/* Error Handlers */
app.use((req: Request, res: Response) => {
    res.status(404).send('404: Page not found');
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('500: Internal error' + error);
});
/*==================================================*/

app.listen(PORT, () => console.log(`get-gas-api is running on port ${PORT}`));

export { app, DB };
