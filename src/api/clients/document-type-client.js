import BaseClient from "./base-client";

class DocumentTypeClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}/document-types`;
  }

  list() {
    return this.axios.get(this.baseUrl)
      .then(response => { return response; });
  }

  save(documentType) {
    return this.axios.post(this.baseUrl, documentType)
      .then(response => { return response; });
  }

  update(documentType) {
    return this.axios.put(`${this.baseUrl}/${documentType.id}`, documentType)
      .then(response => { return response; });
  }
}

export default DocumentTypeClient;