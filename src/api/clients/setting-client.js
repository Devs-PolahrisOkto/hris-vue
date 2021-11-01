import BaseClient from "./base-client";

class SettingClient extends BaseClient {
  constructor(appUrl) {
    super();
    this.baseUrl = `${appUrl}`;
  }

  companyList() {
    return this.axios.get(`${this.baseUrl}/companies`)
      .then(response => { return response; });
  }

  departmentList() {
    return this.axios.get(`${this.baseUrl}/departments`)
      .then(response => { return response; });
  }

  positionList() {
    return this.axios.get(`${this.baseUrl}/positions`)
      .then(response => { return response; });
  }

  employmentTypeList() {
    return this.axios.get(`${this.baseUrl}/employment-types`)
      .then(response => { return response; });
  }

  addressTypeList() {
    return this.axios.get(`${this.baseUrl}/address-types`)
      .then(response => { return response; });
  }

  documentTypeList() {
    return this.axios.get(`${this.baseUrl}/document-types`)
      .then(response => { return response; });
  }

  bankList() {
    return this.axios.get(`${this.baseUrl}/banks`)
      .then(response => { return response; });
  }

  civilStatusList() {
    return this.axios.get(`${this.baseUrl}/civil-statuses`)
      .then(response => { return response; });
  }

  genderList() {
    return this.axios.get(`${this.baseUrl}/genders`)
      .then(response => { return response; });
  }
}

export default SettingClient;