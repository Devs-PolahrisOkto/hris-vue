class Employee {
  constructor(props) {
    if (!props) return;
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
  }

  get employeeName() {
    return `${this.firstname} ${this.lastname}`
  }
}

export default Employee;