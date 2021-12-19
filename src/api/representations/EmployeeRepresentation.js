import { uniqueId } from 'lodash';
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
      positions: '',
      documents: [],
      contacts: [{ id: uniqueId(), name: '', description: '' }],
      addresses: [{
        id: uniqueId(), name: '', address1: '', address2: '', address_type_id: '',
      }],
      education: [{
        id: uniqueId(), description: '', school: '', degree: '', start_at: null, end_at: null,
      }],
      profile_photo: null,
    });
  }
}

export default EmployeeRepresentation;
