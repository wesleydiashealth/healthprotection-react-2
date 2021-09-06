import asteroideApi from './asteroide';

interface Request {
  question: string;
  answer: string;
}

interface Response {
  id: string;
}

export default function createUserQuery(data: Request[]): Promise<Response> {
  return new Promise((resolve, reject) => {
    asteroideApi
      .post('/api/outcome', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
