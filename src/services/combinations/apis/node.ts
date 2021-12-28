import axios from 'axios';

const nodeApi = axios.create({
  baseURL: 'https://node.healthprotection.com/api/',
});

export default nodeApi;
