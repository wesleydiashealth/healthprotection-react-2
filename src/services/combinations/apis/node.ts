import axios from 'axios';

const nodeApi = axios.create({
  baseURL: 'http://node.healthprotection.com/api/',
});

export default nodeApi;
