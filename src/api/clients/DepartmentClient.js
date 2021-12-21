import BaseClient from './BaseClient';

class DepartmentClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/departments`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (department) {
    return this.axios.post(this.baseUrl, department)
      .then(response => response);
  }

  update (department) {
    return this.axios.put(`${this.baseUrl}/${department.id}`, department)
      .then(response => response);
  }
}

export default DepartmentClient;
