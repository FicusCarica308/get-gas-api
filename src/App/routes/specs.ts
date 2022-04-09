import express, { Router, Request, Response } from 'express';
import { connectDB } from '../../DB-Engine/mongo_setup';

/* All /specs routes */

/*
Returns an object with reqeusted info 
{
  Always returned:
  make: [String - make of the vehicle],
  model: [String - model of the vehicle],
  year: [String - year of the vehicle],

  optional (returns either one or all):
  cityMPG: [int],
  highwayMPG: [int],
  combinedMPG: [int],
  octaneRating: [int],
} 
*/

const specsRouter: Router = express.Router();

/* Returns always returned values + cityMPG */
specsRouter.get('/city-mpg/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response) => {
  connectDB({ DBisConnected: req.app.locals.DBisConnected, wasVerification: true })
    .then((result: Boolean) => {
      req.app.locals.DBisConnected = result; /* Sets global DBisConnected to new connection status */
      if (result == true) {
        /* RUN DATABASE QUERY */
        console.log('was true');
        res.send('<h1>was true<\h1>');
        /* IF DATABASE QUERY RETURNS NOTHING RUN REQUEST CALL */
      } else {
        /* RUN REQUEST CALL */
        console.log('was false');
        res.send('<h1>was false<\h1>');
      }
    });
});

/* Returns always returned values + highwayMPG */
specsRouter.get('/highway-mpg/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response) => {
  /* connectDB(req.app.locals.DBisConnected, false); */
  console.log('junk');
  res.send('<h1>junk<\h1>');
});

/* Returns always returned values + combinedMPG */
specsRouter.get('/combined-mpg/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response) => {
});

specsRouter.get('/all-mpg/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response) => {
});

specsRouter.get('/all-fuel-specs/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response) => {
});

specsRouter.get('/')

export { specsRouter };
