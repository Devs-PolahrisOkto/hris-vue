import BaseClient from './base-client';

class GenderClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/genders`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (gender) {
    return this.axios.post(this.baseUrl, gender)
      .then(response => response);
  }

  update (gender) {
    return this.axios.put(`${this.baseUrl}/${gender.id}`, gender)
      .then(response => response);
  }
}

export default GenderClient;
