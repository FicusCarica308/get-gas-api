import express, {Application, Request, Response} from 'express';
import path from 'path';

/*Routers*/
import { specsRouter } from './routes/specs';

const app: Application = express();

/* API Homepage */
app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname + '/homepage/index.html'));
});

app.use('/specs', specsRouter);

app.listen(5555, () => console.log('server is running'));
