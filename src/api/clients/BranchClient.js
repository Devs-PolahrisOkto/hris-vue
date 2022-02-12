import BaseClient from './BaseClient';

class BranchClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/branches`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (branch) {
    return this.axios.post(this.baseUrl, branch)
      .then(response => response);
  }

  update (branch) {
    return this.axios.put(`${this.baseUrl}/${branch.id}`, branch)
      .then(response => response);
  }
}

export default BranchClient;
