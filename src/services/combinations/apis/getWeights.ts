import nodeApi from './node';

import ApiWeightsData from '../dtos/ApiWeightsData';

export default function getOutcomes(): Promise<ApiWeightsData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .get('/weights')
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
