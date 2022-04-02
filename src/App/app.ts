import express, {Application, Request, Response} from 'express';
import path from 'path';

const app: Application = express();

/* API Homepage */
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/homepage/index.html'));
});

app.listen(5555, () => console.log('server is running'));
