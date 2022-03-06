import BaseClient from './BaseClient';

class DocumentClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}/users`;
  }

  list (userId) {
    return this.axios.get(`${this.baseUrl}/${userId}/documents`)
      .then(response => response);
  }

  find (userId, id) {
    return this.axios.get(`${this.baseUrl}/${userId}/documents/${id}`)
      .then(response => response);
  }

  save (userId, file) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('type', 1);
    return this.axios.post(`${this.baseUrl}/${userId}/documents`, formdata)
      .then(response => response);
  }

  update (userId, document) {
    return this.axios.put(`${this.baseUrl}/${userId}/documents/${document.id}`, document)
      .then(response => response);
  }

  delete (userId, id) {
    return this.axios.delete(`${this.baseUrl}/${userId}/documents/${id}`)
      .then(response => response);
  }
}

export default DocumentClient;
