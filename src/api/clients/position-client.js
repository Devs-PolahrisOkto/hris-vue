import BaseClient from "./base-client";

class PositionClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/positions`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(position) {
    return this.axios.post(this.baseUrl, position)
      .then(response => { return response; });
  }

  update(position) {
    return this.axios.put(`${this.baseUrl}/${position.id}`, position)
      .then(response => { return response; });
  }
}

export default PositionClient;