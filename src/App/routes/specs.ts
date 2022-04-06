import express, { Router, Request, Response} from 'express';

/* All /specs routes */
const specsRouter: Router = express.Router();

specsRouter.get('/mpg/:make/:mode/:year', (req: Request, res: Response) => {
    console.log('junk');
    res.send('<h1>junk<\h1>');
});

specsRouter.use(function(req, res, next) {
    let err = new Error(`${req.originalUrl} does not exist`);
    console.log(err);
    res.status(404).send(String(err) + '');
});

export { specsRouter };
