import express, { Router, Request, Response, NextFunction } from 'express';
import { getStations } from '../../Request-Handlers/gas-stations-request';

const stationsRouter: Router = express.Router();

/* This type restricts what keys/values should be passed from the Request object */
type stationQueryParams = {
  [key: string]: string | undefined,
  longitude: string,
  latitude: string,
}

function buildStationParams(req: Request): stationQueryParams {
  return {
      longitude: req.params.longitude,
      latitude: req.params.latitude,
  }
}

stationsRouter.get('/:devKey/:latitude/:longitude/', (req: Request, res: Response, next: NextFunction) => {
    if (req.params.devKey !== process.env.DEV_KEY) {
        res.status(500);
        next(new Error('API IS INCORRECT - ACCESS DENIED'));
    } else {
        const params = buildStationParams(req);
        getStations(params)
        .then((data) => { res.json(data) })
        .catch((error) => {
        console.error(error, error.location);
        res.status(500);
        next(error)
        });
    }
});

stationsRouter.get('/')

export { stationsRouter };
