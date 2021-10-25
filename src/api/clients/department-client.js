import BaseClient from "./base-client";

class DepartmentClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/departments`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(department) {
    return this.axios.post(this.baseUrl, department)
      .then(response => { return response; });
  }

  update(department) {
    return this.axios.put(`${this.baseUrl}/${department.id}`, department)
      .then(response => { return response; });
  }
}

export default DepartmentClient;