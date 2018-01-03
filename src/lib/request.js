import axios from 'axios';
import settings from '../../config/webSettings';

export default (authToken) => {
  authToken = authToken || 1234;
  const req = axios.create({
    baseURL: settings.serverUrl,
    timeout: 10000,
    headers: { Authorization: `Bearer ${authToken}` },
  });

  req.interceptors.response.use(
    null, 
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location = '/login';
      }
      console.log('error', error);
      throw error;
    }
  );
  return req;
};
