import express, { Router, Request, Response, NextFunction } from 'express';
import { connectDB } from '../../DB-Engine/mongo_setup';
import { getCar } from '../../DB-Engine/mongo_storage_handler';
import { getFullSpecs, getCityMpg } from '../../Request-Handlers/car-specs-request';

/* All /specs routes */

/*
Returns an object with reqeusted info 
{
  Always returned:
  make: [String - make of the vehicle],
  model: [String - model of the vehicle],
  year: [String - year of the vehicle],

  optional (returns either one or all):
  city_mpg: [int],
  highwayMPG: [int],
  combinedMPG: [int],
} 
*/

const specsRouter: Router = express.Router();

/* Returns always returned values + cityMPG */
specsRouter.get('/city-mpg/:make/:model/:year/:cylinders?/:displacment?', (req: Request, res: Response, next: NextFunction) => {
  connectDB({ DBisConnected: req.app.locals.DBisConnected, wasVerification: true })
    .then((isConnected: Boolean) => {
      req.app.locals.DBisConnected = isConnected; /* Sets global DBisConnected to new connection status */
      const params = {
        make: req.params.make,
        model: req.params.model,
        year: req.params.year,
        cylinders: req.params.cylinders,
        displacment: req.params.displacment,
      }
      if (isConnected == true) {
        console.log('Running database query with:', req.params);
        getCar(params, 'is_cool')
          .then((car) => {
            console.log('Car found !', car)
            res.json(car);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      getCityMpg(params)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error, error.location);
        res.status(500);
        next(error)
      })
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

specsRouter.get('/')

export { specsRouter };
