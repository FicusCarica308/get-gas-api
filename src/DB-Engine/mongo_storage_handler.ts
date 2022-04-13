import { Car } from '../DB-Engine/Schemas/car'
import { filterObject } from '../utils/object_utils';

type queryParams = {
  [key: string]: string | undefined,
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
}

const alwaysSavedKeys: Array<string> = ['make', 'model', 'year'];

function getCar (params: queryParams, typeOfMpg: Array<string>): Promise<any> {
  console.log('Running database query with:', params);
  return (
    Car.findOne(params)
      .then((car: any) => {
        if (car != null) {
          return (filterObject(car['_doc'], [...typeOfMpg, ...alwaysSavedKeys]));
        }
        throw new Error('No Car Found in database');
      })
    )
}

export { getCar };