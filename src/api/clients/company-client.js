import BaseClient from "./base-client";

class CompanyClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/companies`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(company) {
    return this.axios.post(this.baseUrl, company)
      .then(response => { return response; });
  }

  update(company) {
    return this.axios.put(`${this.baseUrl}/${company.id}`, company)
      .then(response => { return response; });
  }
}

export default CompanyClient;