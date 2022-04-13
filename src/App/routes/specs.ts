import express, { Router, Request, Response, NextFunction } from 'express';
import { connectDB } from '../../DB-Engine/mongo_setup';
import { getCar } from '../../DB-Engine/mongo_storage_handler';
import { getSpecs } from '../../Request-Handlers/car-specs-request';

const specsRouter: Router = express.Router();

type queryParams = {
  [key: string]: string | undefined,
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
}

function buildParams(req: Request): queryParams {
  return {
    make: req.params.make,
    model: req.params.model,
    year: req.params.year,
    cylinders: req.params.cylinders,
  }
}

/* Returns always returned values + cityMPG */
specsRouter.get('/city-mpg/:make/:model/:year/:cylinders?', (req: Request, res: Response, next: NextFunction) => {
  connectDB({ DBisConnected: req.app.locals.DBisConnected, wasVerification: true })
    .then(async (isConnected: Boolean) => {
      const params = buildParams(req);
      req.app.locals.DBisConnected = isConnected; /* Sets global DBisConnected to new connection status */
      let carWasFound: boolean | Error | object = false;
      if (isConnected == true) {
        carWasFound = await getCar(params, ['city_mpg']).catch(error => { console.error(error); return(false); })
      }
      if (!carWasFound || isConnected == false) {
        getSpecs(params, ['city_mpg'])
        .then(data => { if (!res.headersSent) res.json(data) })
        .catch((error) => {
          console.error(error, error.location);
          res.status(500);
          next(error)
        })
      } else {
        res.send(carWasFound);
      }
    });
});

/* Returns always returned values + highwayMPG */
specsRouter.get('/highway-mpg/:make/:model/:year/:junk/:cylinders?', (req: Request, res: Response, next: NextFunction) => {
  try {
  req.params.year = JSON.parse(req.params.year);
  } catch (error) {
    console.log(req.params);
    console.log(error)
    next(error)
  }
});

/* Returns always returned values + combinedMPG */
specsRouter.get('/combined-mpg/:make/:model/:year/:cylinders?', (req: Request, res: Response) => {
});

specsRouter.get('/all-mpg/:make/:model/:year/:cylinders?', (req: Request, res: Response) => {
});

specsRouter.get('/')

export { specsRouter };
