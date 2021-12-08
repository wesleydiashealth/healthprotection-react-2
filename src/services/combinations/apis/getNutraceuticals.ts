import nodeApi from './node';

import ApiFilterData from '../dtos/ApiFilterData';
import ApiSuboutcomeData from '../dtos/ApiSuboutcomeData';
import ApiNutraceuticalData from '../dtos/ApiNutraceuticalData';

interface RequestData {
  filters: ApiFilterData[];
  suboutcomes: ApiSuboutcomeData[];
}

interface ResponseData extends Response {
  nutraceuticals: ApiNutraceuticalData[];
}

export default function getOutcomes(data: RequestData): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .post('/nutraceuticals', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
