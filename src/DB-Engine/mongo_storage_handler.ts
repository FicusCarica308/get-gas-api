import { Car } from '../DB-Engine/Schemas/car'

type queryParams = {
  make: string,
  model: string,
  year: string,
  cylinders?: string | undefined,
  displacment?: string | undefined,
}

function getCar (params: queryParams, type: string): Promise<any> {
  return (
    Car.findOne(params)
      .then((car: any) => {
        if (car != null) {
          return (car);
        }
        throw new Error('No Car Found in database');
      })
    )
}

export { getCar };