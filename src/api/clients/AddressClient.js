import BaseClient from './BaseClient';

class AddressClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/users`;
  }

  list (userId) {
    return this.axios.get(`${this.baseUrl}/${userId}/addresses`)
      .then(response => response);
  }

  find (userId, id) {
    return this.axios.get(`${this.baseUrl}/${userId}/addresses/${id}`)
      .then(response => response);
  }

  save (userId, address) {
    return this.axios.post(`${this.baseUrl}/${userId}/addresses`, address)
      .then(response => response);
  }

  update (userId, address) {
    return this.axios.put(`${this.baseUrl}/${userId}/addresses/${address.id}`, address)
      .then(response => response);
  }

  delete (userId, id) {
    return this.axios.delete(`${this.baseUrl}/${userId}/addresses/${id}`)
      .then(response => response);
  }
}

export default AddressClient;
