import BaseClient from './base-client';

class EmployeeClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/users`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  find (id) {
    return this.axios.get(`${this.baseUrl}/${id}`)
      .then(response => response);
  }

  save (user) {
    return this.axios.post(this.baseUrl, user)
      .then(response => response);
  }

  update (user) {
    return this.axios.put(`${this.baseUrl}/${user.id}`, user)
      .then(response => response);
  }
}

export default EmployeeClient;
