import BaseClient from "./base-client";

class GenderClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/genders`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(gender) {
    return this.axios.post(this.baseUrl, gender)
      .then(response => { return response; });
  }

  update(gender) {
    return this.axios.put(`${this.baseUrl}/${gender.id}`, gender)
      .then(response => { return response; });
  }
}

export default GenderClient;