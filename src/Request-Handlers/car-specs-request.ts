import fetch from 'node-fetch';
import { specsAPIkey, specsAPIurl } from '../private-config';
import { filterObject } from '../utils/object_utils';
import { storeCar } from '../DB-Engine/mongo_storage_handler';

type queryParams = {
  [key: string]: string | undefined,
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
}

type Data = {
  [key: string]: string | number
}


const alwaysSavedKeys: Array<string> = ['make', 'model', 'year'];

function isCorrectCar(params: queryParams, data: Data) {
  for (let key of alwaysSavedKeys) {
    if (params[key] != data[key]) {
      return (false);
    }
  }
  return (true);
}

async function getSpecs (params: queryParams, typeOfMpg: Array<string>): Promise<any> { /* FIX RETURN TYPING */
  const apiQuery: string = `make=${params.make}&year=${params.year}&model=${params.model}&cylinders=${params.cylinders}&displacment=${params.displacment}`;
  return (
    fetch(`${specsAPIurl}${apiQuery}`, { headers: { 'X-Api-Key': specsAPIkey } })
      .then((res: any) => { /* NEEDS TYPING */
        return (
          res.json()
            .then((data: Array<Data>) => {
              if (data.length == 0 || isCorrectCar(params, data[0]) == false) {
                const error: Error = new Error("Car Not Found in API query!")
                throw new Error("Car Not Found in API query!");
              }
              console.log('Getting car with params', params);
              storeCar(data[0]);
              return (filterObject(data[0], [...typeOfMpg, ...alwaysSavedKeys]));
            })
        );
      })
      .catch((error) => {
        error.location = 'Fetch Error: /src/Request-Handlers/car-specs-request*(.ts || .js)';
        throw error;
      })
  );
}

export { getSpecs };
