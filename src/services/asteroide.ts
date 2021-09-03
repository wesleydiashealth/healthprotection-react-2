import axios from 'axios';

const asteroideApi = axios.create({
  baseURL: 'https://hpb.asteroide.tech/',
});

export default asteroideApi;
