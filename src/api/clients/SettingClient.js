import BaseClient from './BaseClient';

class SettingClient extends BaseClient {
  constructor (appUrl) {
    super();
    this.baseUrl = `${appUrl}`;
  }

  companyList () {
    return this.axios.get(`${this.baseUrl}/companies`)
      .then(response => response);
  }

  departmentList () {
    return this.axios.get(`${this.baseUrl}/departments`)
      .then(response => response);
  }

  positionList () {
    return this.axios.get(`${this.baseUrl}/positions`)
      .then(response => response);
  }

  employmentTypeList () {
    return this.axios.get(`${this.baseUrl}/employment-types`)
      .then(response => response);
  }

  addressTypeList () {
    return this.axios.get(`${this.baseUrl}/address-types`)
      .then(response => response);
  }

  documentTypeList () {
    return this.axios.get(`${this.baseUrl}/document-types`)
      .then(response => response);
  }

  bankList () {
    return this.axios.get(`${this.baseUrl}/banks`)
      .then(response => response);
  }

  civilStatusList () {
    return this.axios.get(`${this.baseUrl}/civil-statuses`)
      .then(response => response);
  }

  genderList () {
    return this.axios.get(`${this.baseUrl}/genders`)
      .then(response => response);
  }
}

export default SettingClient;
