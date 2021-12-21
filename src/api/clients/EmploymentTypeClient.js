import BaseClient from './BaseClient';

class EmploymentTypeClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/employment-types`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (employmentType) {
    return this.axios.post(this.baseUrl, employmentType)
      .then(response => response);
  }

  update (employmentType) {
    return this.axios.put(`${this.baseUrl}/${employmentType.id}`, employmentType)
      .then(response => response);
  }
}

export default EmploymentTypeClient;
