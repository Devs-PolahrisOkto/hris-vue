import BaseClient from './BaseClient';

class DocumentClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}`;
  }

  list (userId) {
    return this.axios.get(`${this.baseUrl}/users/${userId}/documents`)
      .then(response => response);
  }

  find (userId, id) {
    return this.axios.get(`${this.baseUrl}/users/${userId}/documents/${id}`)
      .then(response => response);
  }

  save (userId, file) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('type', 1);
    return this.axios.post(`${this.baseUrl}/users/${userId}/documents`, formdata)
      .then(response => response);
  }

  update (userId, document) {
    return this.axios.put(`${this.baseUrl}/users/${userId}/documents/${document.id}`, document)
      .then(response => response);
  }

  delete (id) {
    return this.axios.delete(`${this.baseUrl}/documents/${id}`)
      .then(response => response);
  }
}

export default DocumentClient;
