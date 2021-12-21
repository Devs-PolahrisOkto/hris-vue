import axios from 'axios';

class AuthenticationClient {
  constructor (appUrl) {
    this.baseUrl = `${appUrl}/auth/token`;
  }

  login (credentials) {
    return axios.post(this.baseUrl, credentials)
      .then(response => response);
  }

  logout () {
    return axios.delete(this.baseUrl);
  }
}

export default AuthenticationClient;
