import express, { Router, Request, Response } from 'express';

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
specsRouter.get('/city-mpg', (req: Request, res: Response) => {
    console.log('junk');
    res.send('<h1>junk<\h1>');
});

/* Returns always returned values + highwayMPG */
specsRouter.get('/highway-mpg', (req: Request, res: Response) => {
    console.log('junk');
    res.send('<h1>junk<\h1>');
});

/* Returns always returned values + combinedMPG */
specsRouter.get('/combined-mpg', (req: Request, res: Response) => {
});

specsRouter.get('/all-mpg', (req: Request, res: Response) => {
});

specsRouter.get('/all-fuel-specs', (req: Request, res: Response) => {
});

specsRouter.get('/')

export { specsRouter };
