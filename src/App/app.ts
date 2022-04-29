import express, {Application, NextFunction, Request, Response} from 'express';
import path from 'path';
import mongoose, { Connection } from 'mongoose';
import { connectDB } from '../DB-Engine/mongo_setup';
import cors from "cors";

/*Routers*/
import { specsRouter } from './routes/specs';
import { stationsRouter } from './routes/stations';
/*==================================================*/

/* App setup */
const app: Application = express();
const PORT = process.env.PORT || 5555;
app.use(cors({
  origin: process.env.ORIGIN
}));
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
    res.status(200).sendFile(path.join(__dirname + '/views/index.html'));
});
/*==================================================*/

/* use for '/specs' route and router */
app.use('/specs', specsRouter);
/*==================================================*/

/* use for '/stations' route and router */
app.use('/stations', stationsRouter);
/*==================================================*/

/* Error Handlers */
app.use((req: Request, res: Response) => {
    res.status(404).send('404: Page not found - Double check the Route/Params !');
});

/* Will load if a 500 is sent in any route in the application */
app.use((error: any, req: Request, res: Response, next: NextFunction) => { /* NEEDS HAS CUSTOM ERROR TYPE */
  if (error.message == "Car Not Found in API query!") {
    res.status(500).send(`<h1>500: Internal Server Error - ${error}</h1><h2>Please try again with different parameters or add (/:cylinders?/:displacment?)</h2>`);
  } else {
    res.status(500).send(`<h1>500: Internal Server Error - Other</h1><h3>${error.location || error.message}</h3>`);
  }
});
/*==================================================*/

app.listen(PORT, () => console.log(`get-gas-api is running on port ${PORT}`));

export { app, DB };
