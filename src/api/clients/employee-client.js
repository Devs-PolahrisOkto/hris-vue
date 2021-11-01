import BaseClient from "./base-client";

class EmployeeClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/users`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(user) {
    return this.axios.post(this.baseUrl, user)
      .then(response => { return response; });
  }

  update(user) {
    return this.axios.put(`${this.baseUrl}/${user.id}`, user)
      .then(response => { return response; });
  }
}

export default EmployeeClient;