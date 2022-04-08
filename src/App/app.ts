import express, {Application, NextFunction, Request, Response} from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { mongoURI } from '../../config/private-config';

/*Routers*/
import { specsRouter } from './routes/specs';

/* Mongoose setup */
mongoose.connect(mongoURI);

const DB = mongoose.connection

DB.once('open', _ => {
  console.log('get-gas-api-cluster is connected !')
});

DB.on('error', err => {
  console.error('get-gest-api-cluster cannot connect !(connection error):', err)
});

/* App setup */
const app: Application = express();
const PORT = process.env.PORT || 5555;


/* API Homepage */
app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname + '/views/index.html'));
});

/* use for '/specs' route and router */
app.use('/specs', specsRouter);

/* Error Handlers */
app.use(function(req: Request, res: Response) {
    res.status(404).send('404: Page not found');
});

app.use(function(error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).send('500: Internal error' + error);
});
/*==================================================*/

app.listen(PORT, () => console.log(`get-gas-api is running on port ${PORT}`));
