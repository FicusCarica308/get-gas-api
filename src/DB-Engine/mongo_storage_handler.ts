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
  if (params.cylinders == null || isNaN(Number(params.cylinders))) {
    delete params['cylinders'];
  }
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

function storeCar(car: any): void {
  const newCar = new Car ({
    make: car.make,
    model: car.model,
    year: Number(car.year),
    cylinders: Number(car.cylinders),
    city_mpg: Number(car.city_mpg),
    highway_mpg: (car.highway_mpg),
    combination_mpg: (car.combination_mpg),
  });

  newCar.save()
    .then(() => {
      console.log('new car has been saved with :', newCar);
    })
    .catch((error: Error) => {
      console.error('Error saving new car !', error);
    })
}

export { getCar, storeCar };
