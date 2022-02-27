import BaseClient from './BaseClient';

class AddressClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/addresses`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  find (id) {
    return this.axios.get(`${this.baseUrl}/${id}`)
      .then(response => response);
  }

  save (address) {
    return this.axios.post(this.baseUrl, address)
      .then(response => response);
  }

  update (address) {
    return this.axios.put(`${this.baseUrl}/${address.id}`, address)
      .then(response => response);
  }

  delete (id) {
    return this.axios.delete(`${this.baseUrl}/${id}`)
      .then(response => response);
  }
}

export default AddressClient;
