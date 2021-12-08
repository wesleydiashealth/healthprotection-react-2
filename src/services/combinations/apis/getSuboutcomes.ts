import nodeApi from './node';

import ApiFilterData from '../dtos/ApiFilterData';
import ApiOutcomeData from '../dtos/ApiOutcomeData';
import ApiSuboutcomeData from '../dtos/ApiSuboutcomeData';

interface RequestData {
  filters: ApiFilterData[];
  outcomes: ApiOutcomeData[];
}

interface ResponseData extends Response {
  suboutcomes: ApiSuboutcomeData[];
}

export default function getOutcomes(data: RequestData): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    nodeApi
      .post('/suboutcome', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}
