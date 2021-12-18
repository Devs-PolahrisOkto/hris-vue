import BaseClient from './base-client';

class BankClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/banks`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (bank) {
    return this.axios.post(this.baseUrl, bank)
      .then(response => response);
  }

  update (bank) {
    return this.axios.put(`${this.baseUrl}/${bank.id}`, bank)
      .then(response => response);
  }
}

export default BankClient;
