import nodeApi from './node';

import ApiFilterData from '../dtos/ApiFilterData';
import ApiNutraceuticalData from '../dtos/ApiNutraceuticalData';
import ApiInteractionData from '../dtos/ApiInteractionData';

interface RequestData {
  filters: ApiFilterData[];
  nutraceuticals: ApiNutraceuticalData[];
}

interface ResponseData extends Response {
  interactions: ApiInteractionData[];
}

export default function getOutcomes(data: RequestData): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .post('/nutraceuticalsInteractions', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
