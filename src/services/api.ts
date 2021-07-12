import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hpb.asteroide.tech/',
});

export default api;
