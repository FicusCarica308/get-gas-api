import fetch from 'node-fetch';
import { specsAPIkey } from '../private-config';

const response = fetch('https://api.api-ninjas.com/v1/cars?limit=1&make=nissan&year=1990&model=300zx', { headers: {'X-Api-Key': specsAPIkey }})
  .then((res: any) => res.json().then((data: any) => console.log(data)))
  .catch((error) => console.log(error));
