import express, { Router, Request, Response, NextFunction } from 'express';
import { connectDB } from '../../DB-Engine/mongo_setup';
import { getCar } from '../../DB-Engine/mongo_storage_handler';
import { getSpecs } from '../../Request-Handlers/car-specs-request';

const specsRouter: Router = express.Router();

/* This type restricts what keys/valuues should be passed from the Request object */
type queryParams = {
  [key: string]: string | undefined,
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
}

/* This type restricts what can be passed to the :type parameter in the /specs route */
type TypeOfMpg = "city_mpg" | "highway_mpg" | "combination_mpg" | "all_mpg"

/*
* Description: This function creates a javascript objects based on
*   the parameters passed to the /specs route (accessed via req.params).
* 
* Params:
* @req [Request Object] - The Request object passed from the router.
*
* Return: Returns a new object matching the queryParams typescipt type.
*/
function buildParams(req: Request): queryParams {
  return {
    make: req.params.make,
    model: req.params.model,
    year: req.params.year,
    cylinders: req.params.cylinders,
  }
}

/* This route will return a object containing the make, model, year and
* cylinders of a given vehicle + the requested type of MPG (refer to TypeOfMpg type)
*/
specsRouter.get('/:devKey/:type/:make/:model/:year/:cylinders?', (req: Request, res: Response, next: NextFunction) => {
  const type: TypeOfMpg = req.params.type as TypeOfMpg;
  let typeOfMpg: Array<string>;
  delete req.params.type;

  if (req.params.devKey !== process.env.DEV_KEY) {
    res.status(500);
    next(new Error('API IS INCORRECT - ACCESS DENIED'));
  } else {
    if (type == "all_mpg") {
      typeOfMpg = ['city_mpg', 'highway_mpg', 'combination_mpg'];
    } else {
      typeOfMpg = [type];
    }

    /* First I call my custom function connectDB which ensures the database is connected before proceeding */
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
  }
});

specsRouter.get('/')

export { specsRouter };
