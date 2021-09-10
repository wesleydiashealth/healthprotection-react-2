import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';

import wordpressApi from 'services/wordpress';

interface Request {
  question: string;
  answer: string;
}

interface ResponseData extends Response {
  content: {
    uuid: string;
    outcomes: OutcomeData[];
    suboutcomes: SuboutcomeData[];
  };
}

export default function createUserQuery(
  data: Request[],
): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    wordpressApi
      .post('/wp-json/hp/v1/sankey', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
