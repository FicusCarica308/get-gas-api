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

type TypeOfMpg = "city_mpg" | "highway_mpg" | "combination_mpg" | "all_mpg"

function buildParams(req: Request): queryParams {
  return {
    make: req.params.make,
    model: req.params.model,
    year: req.params.year,
    cylinders: req.params.cylinders,
  }
}

/* Returns always returned values + cityMPG */
specsRouter.get('/:type/:make/:model/:year/:cylinders?', (req: Request, res: Response, next: NextFunction) => {
  const type: TypeOfMpg = req.params.type as TypeOfMpg;
  let typeOfMpg: Array<string>;
  delete req.params.type;

  if (type == "all_mpg") {
    typeOfMpg = ['city_mpg', 'highway_mpg', 'combination_mpg'];
  } else {
    typeOfMpg = [type];
  }

  connectDB({ DBisConnected: req.app.locals.DBisConnected, wasVerification: true })
    .then(async (isConnected: Boolean) => {
      const params = buildParams(req);
      req.app.locals.DBisConnected = isConnected; /* Sets global DBisConnected to new connection status */
      let carWasFound: boolean | Error | object = false;
      if (isConnected == true) {
        carWasFound = await getCar(params, typeOfMpg).catch(error => { console.error(error); return(false); })
      }
      if (!carWasFound || isConnected == false) {
        getSpecs(params, typeOfMpg)
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

specsRouter.get('/')

export { specsRouter };
