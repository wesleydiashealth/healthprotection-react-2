import FoodData from 'dtos/FoodData';

import wordpressApi from 'services/wordpress';

interface Request {
  uuid: string;
  nutraceuticals: string[];
}

interface Response {
  content: FoodData[];
}

export default function getFoods(data: Request): Promise<Response> {
  return new Promise((resolve, reject) => {
    wordpressApi
      .post('/wp-json/hp/v1/foods', data)
      .then(async response => {
        const { data: responseData } = response;

        resolve(responseData);
      })
      .catch(error => {
        reject(error);
      });
  });
}
