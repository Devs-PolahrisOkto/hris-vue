import BaseClient from './BaseClient';

class PositionClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/positions`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (position) {
    return this.axios.post(this.baseUrl, position)
      .then(response => response);
  }

  update (position) {
    return this.axios.put(`${this.baseUrl}/${position.id}`, position)
      .then(response => response);
  }
}

export default PositionClient;
