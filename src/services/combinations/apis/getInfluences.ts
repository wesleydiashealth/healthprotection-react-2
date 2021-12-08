import nodeApi from './node';

import ApiFilterData from '../dtos/ApiFilterData';
import ApiNutraceuticalData from '../dtos/ApiNutraceuticalData';
import ApiInfluenceData from '../dtos/ApiInfluenceData';

interface RequestData {
  filters: ApiFilterData[];
  nutraceuticals: ApiNutraceuticalData[];
}

interface ResponseData extends Response {
  influences: ApiInfluenceData[];
}

export default function getOutcomes(data: RequestData): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .post('/nutraceuticalsInfluences', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
