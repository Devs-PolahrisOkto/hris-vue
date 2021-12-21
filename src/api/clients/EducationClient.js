import BaseClient from './BaseClient';

class EducationClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/education`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  find (id) {
    return this.axios.get(`${this.baseUrl}/${id}`)
      .then(response => response);
  }

  save (education) {
    return this.axios.post(this.baseUrl, education)
      .then(response => response);
  }

  update (education) {
    return this.axios.put(`${this.baseUrl}/${education.id}`, education)
      .then(response => response);
  }

  delete (id) {
    return this.axios.delete(`${this.baseUrl}/${id}`)
      .then(response => response);
  }
}

export default EducationClient;
