import BaseClient from './BaseClient';

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

  upload (file) {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.axios.post(`${this.baseUrl}/import`, formdata)
      .then(response => response);
  }

  uploadDocument (file, id) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('type', 1);
    formdata.append('id', id);
    return this.axios.post(`${this.baseUrl}/documents`, formdata)
      .then(response => response);
  }
}

export default EmployeeClient;
