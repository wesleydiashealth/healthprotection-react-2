import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.healthprotection.com/',
  headers: {
    Authorization:
      'Basic aGVhbHRoLXByb3RlY3Rpb246VHZWMyBrbDhqIE1wY2cgVk5zcSA4OHZLIDNCQlg=',
  },
});

export default api;
