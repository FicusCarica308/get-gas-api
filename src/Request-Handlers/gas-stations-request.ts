import fetch from 'node-fetch';
import { googleMapsAPIkey } from '../private-config';

type stationQueryParams = {
    [key: string]: string | undefined,
    longitude: string,
    latitude: string,
}

type Data = {
  results: [],
  status: string,
}

async function getStations (params: stationQueryParams): Promise<any> { /* FIX RETURN TYPING */
  const apiQuery: string = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${params.latitude}%2C${params.longitude}&rankby=distance&type=gas_station&key=${googleMapsAPIkey}`;
  return (
    fetch(apiQuery)
      .then((res: any) => { /* NEEDS TYPING */
        return (
          res.json()
            .then((data: Data) => {
                const normalized = data.results.map((result: any) => { /* Requries full typing */
                    return {
                        longitude: result.geometry.location.lng,
                        latitude: result.geometry.location.lat,
                        place_id: result.place_id,
                        name: result.name,
                    }
                });
                return(normalized);
            })
        );
      })
      .catch((error) => {
        error.location = 'Fetch Error: /src/Request-Handlers/gas-specs-request*(.ts || .js)';
        throw error;
      })
  );
}

export { getStations };
