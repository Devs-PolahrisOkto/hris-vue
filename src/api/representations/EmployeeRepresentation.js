import Representation from '@/api/representations/Representation';

class EmployeeRepresentation extends Representation {
  constructor () {
    super({
      user: {
        firstname: '',
        middlename: '',
        lastname: '',
        nickname: '',
        extension: '',
        title: '',
        birthDate: null,
        username: '',
        email: '',
        password: '',
        gender_id: '',
        employment_type_id: '',
        branch_id: '',
        civilstatus_id: '',
      },
      company_id: '',
      department_id: '',
      positions: [],
      documents: [],
      contacts: [],
      addresses: [],
      education: [],
      profile_photo: null,
    });
  }
}

export default EmployeeRepresentation;
