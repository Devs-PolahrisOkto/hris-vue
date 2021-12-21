import axios from 'axios';

class BaseClient {
  constructor () {
    this.axios = axios.create({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        Accept: 'application/json',
      },
    });
    this.axios.interceptors.response.use(response => {
      const { headers: { authorization = '' } } = response;
      const authHeader = authorization.split(/\s+/);
      const token = authHeader.length > 1 && authHeader[1];
      localStorage.setItem('accessToken', token);
      return response;
    }, error => {
      const { response: { status } } = error;
      if (status === 401) {
        window.location = '/';
      }
    });
  }

  _handleResponse (filter) {
    return response => {
      if (filter(response)) {
        return response;
      }

      console.error('Response from server: ', response);
      throw response;
    };
  }
}

export default BaseClient;
