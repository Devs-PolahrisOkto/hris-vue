import BaseClient from './BaseClient';

class ExperienceClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/experiences`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  find (id) {
    return this.axios.get(`${this.baseUrl}/${id}`)
      .then(response => response);
  }

  save (experience) {
    return this.axios.post(this.baseUrl, experience)
      .then(response => response);
  }

  update (experience) {
    return this.axios.put(`${this.baseUrl}/${experience.id}`, experience)
      .then(response => response);
  }

  delete (id) {
    return this.axios.delete(`${this.baseUrl}/${id}`)
      .then(response => response);
  }
}

export default ExperienceClient;
