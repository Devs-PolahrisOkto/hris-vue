import BaseClient from './BaseClient';

class EmployeeClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/users`;
  }

  list (params) {
    const {
      page, size, sort, filter,
    } = params;
    return this.axios.get(`${this.baseUrl}?page=${page}&size=${size}&sort=${sort}&filter[firstname]=${filter}`)
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
    return this.axios.put(`${this.baseUrl}/${user?.id}`, user)
      .then(response => response);
  }

  upload (file) {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.axios.post(`${this.baseUrl}/import`, formdata)
      .then(response => response)
      .catch(error => error.response);
  }
}

export default EmployeeClient;
