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

function getCar (params: queryParams, typeOfMpg: Array<string>): Promise<object> | Promise<Error> {
  console.log('Running database query with:', params);
  return (
    Car.findOne(params)
      .then((car: any) => {
        if (car != null) {
          console.log('Car was found ! - ', car);
          return (filterObject(car['_doc'], [...typeOfMpg, ...alwaysSavedKeys]));
        }
        throw new Error('No Car Found in database');
      })
    )
}

function storeCar(car: object): boolean {
  return (true);
}

export { getCar };