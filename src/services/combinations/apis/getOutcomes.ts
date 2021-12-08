import nodeApi from './node';

import ApiFilterData from '../dtos/ApiFilterData';
import ApiOutcomeData from '../dtos/ApiOutcomeData';

interface RequestData {
  filters: ApiFilterData[];
}

interface ResponseData extends Response {
  outcomes: ApiOutcomeData[];
}

export default function getOutcomes(data: RequestData): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .post('/outcome', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
