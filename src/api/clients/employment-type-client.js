import BaseClient from "./base-client";

class EmploymentTypeClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/employment-types`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(employmentType) {
    return this.axios.post(this.baseUrl, employmentType)
      .then(response => { return response; });
  }

  update(employmentType) {
    return this.axios.put(`${this.baseUrl}/${employmentType.id}`, employmentType)
      .then(response => { return response; });
  }
}

export default EmploymentTypeClient;