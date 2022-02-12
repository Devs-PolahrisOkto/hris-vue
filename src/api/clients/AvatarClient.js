import BaseClient from './BaseClient';

class AvatarClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/avatar`;
  }

  uploadCurrentUserAvatar (file) {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.axios.post(`${this.baseUrl}`, formdata)
      .then(response => response);
  }

  uploadUserAvatar (file, id) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('type', 1);
    return this.axios.post(`${this.baseUrl}/${id}`, formdata)
      .then(response => response);
  }
}

export default AvatarClient;
