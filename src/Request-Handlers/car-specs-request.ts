import fetch from 'node-fetch';
import { specsAPIkey, specsAPIurl } from '../private-config';
import { filterObject } from '../utils/object_utils';

type queryParams = {
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
  displacment?: string | undefined,
}

const alwaysSavedKeys = ['make', 'model', 'year']

function getFullSpecs (params: queryParams): Promise<any> { /* FIX RETURN TYPING */
  const apiQuery = `make=${params.make}&year=${params.year}&model=${params.model}&`;
  const apiQueryOptional = `cylinders=${params.cylinders}&displacment=${params.displacment}`;
  return (
    fetch(`${specsAPIurl}${apiQuery}${apiQueryOptional}`, { headers: { 'X-Api-Key': specsAPIkey } })
      .then((res: any) => { /* NEEDS TYPING */
        return (
          res.json()
            .then((data: Array<Object>) => { /* NEEDS TYPING */
              if (data.length == 0) {
                throw new Error("Car Not Found in API query!");
              }
              return (data);
            })
        );
      })
      .catch((error) => {
        throw error;
      })
  );
}

function getCityMpg (params: queryParams): Promise<any> { /* FIX RETURN TYPING */
  return (
    getFullSpecs(params)
      .then((data) => {
        const normalized: Object = filterObject(data[0], ['city_mpg', ...alwaysSavedKeys]); /* NEEDS TYPING */
        return (normalized);
      })
      .catch((error) => { /* NEEDS TYPING */
        error.location = 'COULDNT FETCH DATA ! - [ORIGIN]: getFullSpecs() [FROM] - src/Request-Handlers/car-specs-request.ts';
        throw error;
      })
  );
}

export { getFullSpecs, getCityMpg };
