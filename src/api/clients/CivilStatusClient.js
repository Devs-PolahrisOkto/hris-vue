import BaseClient from './BaseClient';

class CivilStatusClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/civil-statuses`;
  }

  list () {
    return this.axios.get(this.baseUrl)
      .then(response => response);
  }

  save (civilStatus) {
    return this.axios.post(this.baseUrl, civilStatus)
      .then(response => response);
  }

  update (civilStatus) {
    return this.axios.put(`${this.baseUrl}/${civilStatus.id}`, civilStatus)
      .then(response => response);
  }
}

export default CivilStatusClient;
