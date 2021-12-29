class Employee {
  constructor (props) {
    if (!props) { return; }
    this.id = props.id;
    this.avatar = props.avatar;
    this.gender_id = props.gender_id;
    this.branch_id = props.branch_id;
    this.employment_type_id = props.employment_type_id;
    this.email = props.email;
    this.username = props.username;
    this.title = props.title;
    this.firstname = props.firstname;
    this.middlename = props.middlename;
    this.lastname = props.lastname;
    this.nickname = props.nickname;
    this.birthDate = props.birthDate;
    this.status = props.status;
    this.email_verified_at = props.email_verified_at;
    this.hired_at = props.hired_at;
    this.started_at = props.started_at;
    this.resigned_at = props.resigned_at;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.deleted_at = props.deleted_at;
    this.two_factor_recovery_codes = props.two_factor_recovery_codes;
    this.two_factor_secret = props.two_factor_secret;
    this.gender = props.gender;
    this.employment_type = props.employment_type;
    this.positions = props.positions;
    this.banks = props.banks;
    this.branch = props.branch;
    this.departments = props.departments;
    this.addresses = props.addresses;
    this.contacts = props.contacts;
    this.education = props.education;
    this.documents = props.documents;
  }

  get employeeName () {
    return `${this.firstname} ${this.lastname}`;
  }

  get employmentTypeName () {
    return this.employment_type && this.employment_type.name;
  }

  get positionName () {
    return this.positions && this.positions[0] && this.positions[0].name;
  }
}

export default Employee;
